const CryptoJS = require("crypto-js"); 

class TxOut {
  constructor(address, amount) {
    this.address = address; 
    this.amount = amount; 
  };
};

class TxIn {
  constructor(txOutId, txOutIndex, signature) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.signature = signature;
  };
};

class Transaction {
  constructor(id, txIns, txOuts) {
    this.id = id;
    this.txIns = txIns;
    this.txOuts = txOuts;
  };
};

const getTransactionId = (transaction) => {
  const txInContent = transaction.txIns
    .map((txIn) => txIn.txOutId + txIn.txOutIndex)
    .reduce((a, b) => a + b, '')

  const txOutContent = transaction.txOuts
    .map((txOut) => txOut.address + txOut.amount)
    .reduce((a, b) => a + b, '')

  return CryptoJS.SHA256(txInContent + txOutContent).toString();
};

const COINBASE_AMOUNT = 50;

const createCoinbaseTx = (address, blockIndex) => {
  const tx = new Transaction();
  const txIn = new TxIn();
  txIn.signature = "";
  txIn.txOutId = "";
  txIn.txOutIndex = blockIndex;
  tx.txIns = [txIn];
  tx.txOuts = [new TxOut(address, COINBASE_AMOUNT)];
  tx.id = getTransactionId(tx);
  return tx;
};

module.exports = {
  createCoinbaseTx,
}