const express = require("express");
const { initP2PServer } = require("./blockchain/p2pServer");
const { initWallet } = require("./blockchain/wallet");
const BlockChainRouter = require('./blockchain/httpServer');

const HTTP_PORT = process.env.HTTP_PORT || 4000;
const P2P_PORT = process.env.P2P_PORT || 6000;

const initHttpServer = () => {
  const app = express();
  app.use(express.json());

  app.use("/api", BlockChainRouter);

  app.listen(HTTP_PORT, () => {
    console.log(`Listening Http Port : ${HTTP_PORT}`);
  });
};

initHttpServer();
initP2PServer(P2P_PORT);
initWallet();