const ecdsa = require("elliptic");
const ec = new ecdsa.ec("secp256k1");
const CryptoJS = require("crypto-js"); 
const { toHexString } = require("./utils");

const COINBASE_AMOUNT = 50;

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

class UnspentTxOut {
  constructor(txOutId, txOutIndex, address, amount) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
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

const findUnspentTxOut = (txOutId, txOutIndex, uTxOutList) => {
  return uTxOutList.find(
    uTxO => uTxO.txOutId === txOutId && uTxO.txOutIndex === txOutIndex
  );
};

const updateUnspentTxOuts = (newTransactions, unspentTxOutLists) => {
  const newUnspentTxOuts = newTransactions
    .map((tx) =>{
      return tx.txOuts.map(
        (txOut, index) => new UnspentTxOut(tx.id, index, txOut.address, txOut.amount)
      )}
    )
    .reduce((a, b) => a.concat(b), []);

  const spentTxOuts = newTransactions
    .map(tx => tx.txIns)
    .reduce((a, b) => a.concat(b), [])
    .map(txIn => new UnspentTxOut(txIn.txOutId, txIn.txOutIndex, "", 0));

  const resultingUnspentTxOuts = unspentTxOutLists
    .filter(uTxO => !findUnspentTxOut(uTxO.txOutId, uTxO.txOutIndex, spentTxOuts))
    .concat(newUnspentTxOuts);

  return resultingUnspentTxOuts;
};

const getPublicKey = (privateKey) => {
  return ec
    .keyFromPrivate(privateKey, "hex")
    .getPublic()
    .encode("hex");
};

const signTxIn = (transaction, txInIndex, privateKey, aUnspentTxOuts) => {
  const txIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;

  const referencedUnspentTxOut = findUnspentTxOut(
    txIn.txOutId,
    txIn.txOutIndex,
    aUnspentTxOuts,
  );

  if (referencedUnspentTxOut === null || referencedUnspentTxOut === undefined) {
    throw Error("Couldn't find the referenced uTxOut, not signing");
  };

  const referencedAddress = referencedUnspentTxOut.address;
  if (getPublicKey(privateKey) !== referencedAddress) {
    return false;
  };

  const key = ec.keyFromPrivate(privateKey, "hex");
  const signature = toHexString(key.sign(dataToSign).toDER());

  return signature;
};


module.exports = {
  createCoinbaseTx,
  updateUnspentTxOuts,
  signTxIn,
  getTransactionId,
  COINBASE_AMOUNT,
  findUnspentTxOut,
  TxOut,
  TxIn,
  Transaction,
};