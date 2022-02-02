const WebSocket = require("ws");
const { WebSocketServer } = require("ws");
const { addBlock, getLastBlock, createHash, getBlocks, replaceChain, handleIncomingTx } = require("./block");
const { isValidBlockStructure } = require("./checkValidBlock");
const { getMempool } = require("./memPool");

const initP2PServer = (ws_port) => {
  const server = new WebSocketServer({ port: ws_port });
  server.on("connection", (ws) => {
    initConnection(ws);
  });
  server.on("error", () => {
    console.log("error");
  });
  console.log("Listening webSocket port : " + ws_port);
};

let sockets = [];

const queryLatestMsg = () => {
  return {
    type: MessageType.QUERY_LATEST,
    data: null,
  };
};

const responseLatestMsg = () => {
  return {
    type: MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify([getLastBlock()]),
  };
};

const queryAllMsg = () => {
  return {
    type: MessageType.QUERY_ALL,
    data: null,
  };
};

const responseAllChainMsg = () => {
  return {
    type: MessageType.RESPONSE_BLOCKCHAIN,
    data: JSON.stringify(getBlocks()),
  };
};

const getAllMempool = () => {
  return {
    type: MessageType.REQUEST_MEMPOOL,
    data: null,
  };
};

const returnMempool = () => {
  return {
    type: MessageType.MEMPOOL_RESPONSE,
    data: getMempool(),
  };
};

const initConnection = (ws) => {
  sockets.push(ws);
  initMessageHandler(ws);
  initErrorHandler(ws);
  write(ws, queryLatestMsg());
  setTimeout(() => {
    broadcast(getAllMempool()); // changed line
  }, 1000);
  setInterval(() => {
    if (sockets.includes(ws)) {
      write(ws, "");
    }
  }, 1000);
};

const getSockets = () => {
  return sockets;
};

const connectToPeers = (newPeers) => {
  newPeers.forEach((peer) => {  
    const ws = new WebSocket(peer);
    ws.on("open", () => {
      initConnection(ws);
    });
    ws.on("error", (error) => {
      console.log("connetion Failed! " + error);
      return false;
    });
  });
};

const initErrorHandler = (ws) => {
  ws.on("close", () => {
    closeConnection(ws);
  });
  ws.on("error", () => {
    closeConnection(ws);
  });
};

const closeConnection = (ws) => {
  console.log(`Connection close ${ws.url}`);
  sockets.splice(sockets.indexOf(ws), 1);
};

const write = (ws, message) => {
  ws.send(JSON.stringify(message));
};

const MessageType = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2,
  REQUEST_MEMPOOL : 3,
  MEMPOOL_RESPONSE : 4,
};

const initMessageHandler = (ws) => {
  ws.on("message", (data) => {
    const message = JSON.parse(data);

    if (message === null) {
      return;
    }

    switch (message.type) {
      case MessageType.QUERY_LATEST:
        write(ws, responseLatestMsg());
        break;
      case MessageType.QUERY_ALL:
        write(ws, responseAllChainMsg());
        break;
      case MessageType.RESPONSE_BLOCKCHAIN:
        const receivedBlocks = message.data;
        if (receivedBlocks === null) {
          break;
        }
        handleBlockChainResponse(receivedBlocks);
        break;
      case MessageType.REQUEST_MEMPOOL:
        write(ws, returnMempool());
        break;
      case MessageType.MEMPOOL_RESPONSE:
        const receivedTxs = message.data;
        if (receivedTxs === null) {
          return;
        }
        receivedTxs.forEach(tx => {
          try {
            handleIncomingTx(tx);
            broadcast(returnMempool());
          } catch (e) {
            console.log(e);
          }
        });
        break;
    };
  });
};

const handleBlockChainResponse = (message) => {
  const receiveBlocks = JSON.parse(message);
  if (receiveBlocks.length === 0) {
    console.log("received block chain size of 0");
    return;
  };

  const latestReceiveBlock = receiveBlocks[receiveBlocks.length - 1];
  if (!isValidBlockStructure(latestReceiveBlock)) {
    console.log("block structure not valid");
    return;
  };

  const latestMyBlock = getLastBlock();
  if (latestReceiveBlock.header.index > latestMyBlock.header.index) {
    if (createHash(latestMyBlock) === latestReceiveBlock.header.previousHash) {
      if (addBlock(latestReceiveBlock)) {
        broadcast(responseLatestMsg());
      } else {
        console.log("Invaild Block!!");
      }
    } else if (receiveBlocks.length === 1) {
      broadcast(queryAllMsg());
    } else {
      replaceChain(receiveBlocks);
    }
  } else {
    console.log("Do nothing.");
  };
};

const broadcast = (message) => {
  sockets.forEach((socket) => {
    write(socket, message);
  });
};

module.exports = {
  initP2PServer,
  connectToPeers,
  getSockets,
  broadcast,
  responseLatestMsg,
  returnMempool,
};