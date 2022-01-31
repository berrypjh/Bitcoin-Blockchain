const express = require("express");
const { addBlock, getBlocks, getVersion, nextBlock } = require("./block");
const { initP2PServer, connectToPeers, getSockets } = require("./p2pServer");

const HTTP_PORT = process.env.HTTP_PORT || 4000;
const P2P_PORT = process.env.P2P_PORT || 6000;

const initHttpServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/blocks", (req, res) => {
    res.send(getBlocks());
  });

  app.post("/mineBlock", (req, res) => {
    const data = req.body.data || [];
    const block = nextBlock(data);
    addBlock(block);

    res.send(block);
  });

  app.get("/version", (req, res) => {
    res.send(getVersion());
  });

  app.post("/stop", (req, res) => {
    res.send({ "msg" : "Stop Server!" });
    process.exit();
  });
  
  app.post("/addPeers", (req, res) => {
    const peer = req.body.peer || [];
    connectToPeers(peer);
    res.send("success");
  });

  app.get("/peers", (req, res) => {
    let sockInfo = [];
    getSockets().forEach((s) => {
      sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
    });
    res.status(200).json({ peer: sockInfo, success: true });
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Listening Http Port : ${HTTP_PORT}`);
  });
};

initHttpServer();
initP2PServer(P2P_PORT);