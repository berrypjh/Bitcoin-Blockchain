const express = require("express");
const router = express.Router();
const { addBlock, getBlocks, getVersion, newNextBlock, getUnspentTxOuts, getAccountBalance, sendTx } = require("./block");
const { getMempool } = require("./memPool");
const { connectToPeers, getSockets } = require("./p2pServer");
const { getBalance, getPublicKeyFromWallet } = require("./wallet");

router.get("/blocks", (req, res) => {
  res.send(getBlocks());
});

router.get("/utxos", (req, res) => {
  res.send(getUnspentTxOuts());
});

router.post("/mineBlock", (req, res) => {
  const block = newNextBlock();
  if(!addBlock(block)) {
    res.send({ message: false });
    return;
  };
  res.send({ message: true });
});

router.get("/version", (req, res) => {
  res.send(getVersion());
});

router.post("/stop", (req, res) => {
  res.send({ "msg" : "Stop Server!" });
  process.exit();
});

router.post("/addPeers", (req, res) => {
  const peer = req.body.peer || [];
  connectToPeers(peer);

  const peerNumber = peer[0].split(':');
  return res.json({ peer: peerNumber[2] });
});

router.get("/peers", (req, res) => {
  let sockInfo = [];
  getSockets().forEach((s) => {
    sockInfo.push(s._socket.remoteAddress + ":" + s._socket.remotePort);
  });
  res.status(200).json({ peer: sockInfo, success: true });
});

router.get("/address/:address", (req, res) => {
  const { address } = req.params;
  const balance = getBalance(address, getUnspentTxOuts());
  res.send({ balance });
});

router.get("/address", (req, res) => {
  res.send(getPublicKeyFromWallet());
});

router.get("/balance", (req, res) => {
  const balance = getAccountBalance();
  res.send({ balance });
});

router.post("/addtransactions", (req, res) => {
  try {
    console.log(req.body);
    const { address, amount } = req.body;
    const amountNumber = parseInt(amount);
    if (address === undefined || amount === undefined) {
      res.send({ message: false });
    } else {
      sendTx(address, amountNumber);
      res.send({ message: true });
    }
  } catch (e) {
    console.log(e.message);
    res.send({ message: false });
  };
});

router.get("/transactionPool", (req, res) => {
  res.send(getMempool());
});

module.exports = router;