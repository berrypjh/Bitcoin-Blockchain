const express = require("express");
const { addBlock, getBlocks, getVersion, newNextBlock, getUnspentTxOuts, getAccountBalance, sendTx } = require("./block");
const { getMempool } = require("./memPool");
const { initP2PServer, connectToPeers, getSockets } = require("./p2pServer");
const { initWallet, getBalance, getPublicKeyFromWallet } = require("./wallet");

const HTTP_PORT = process.env.HTTP_PORT || 4000;
const P2P_PORT = process.env.P2P_PORT || 6000;

const initHttpServer = () => {
  const app = express();
  app.use(express.json());

  app.get("/blocks", (req, res) => {
    res.send(getBlocks());
  });

  app.get("/utxos", (req, res) => {
    res.send(getUnspentTxOuts());
  });

  app.post("/mineBlock", (req, res) => {
    const address = req.body.address;
    const amount = req.body.amount;
    try {
      const block = newNextBlock(address, amount);
      addBlock(block);
  
      res.send(block);
    } catch (e) {
      console.log(e.message);
      res.status(400).send(e.message);
    }
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

  app.get("/address", (req, res) => {
    res.send(getPublicKeyFromWallet());
  });

  app.get("/balance", (req, res) => {
    const balance = getAccountBalance();
    res.send({ balance });
  });

  app.get("/address/:address", (req, res) => {
    const { address } = req.params;
    const balance = getBalance(address, getUnspentTxOuts());
    res.send({ balance });
  });

  app.post("/addtransactions", (req, res) => {
    try {
      const { address, amount } = req.body;
      if (address === undefined || amount === undefined) {
        throw Error("Please specify and address and an amount");
      } else {
        const resPonse = sendTx(address, amount);
        res.send(resPonse);
      }
    } catch (e) {
      res.status(400).send(e.message);
    };
  });

  app.get("/transactionPool", (req, res) => {
    res.send(getMempool());
  });

  app.listen(HTTP_PORT, () => {
    console.log(`Listening Http Port : ${HTTP_PORT}`);
  });
};

initHttpServer();
initP2PServer(P2P_PORT);
initWallet();