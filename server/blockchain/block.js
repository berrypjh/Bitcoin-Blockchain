const fs = require('fs');
const merkle = require('merkle');
const cryptojs = require('crypto-js');
const _ = require("lodash");
const hexToBinary = require('hex-to-binary');
const { getPublicKeyFromWallet, getBalance, createTx, getPrivateKeyFromWallet, findUnspentTxOuts, findMyUTxOutsFromMempool, findMyUTxOutsFromMyMempool } = require('./wallet');
const { createCoinbaseTx } = require('./transaction');
const { processTransactions } = require('./checkValidTx');
const { addToMempool, getMempool, updateMempool } = require('./memPool');

const BLOCK_GENERATION_INTERVAL = 10;
const DIFFICULTY_ADJUSMENT_INTERVAL = 10;

class Block {
  constructor(header, body) {
    this.header = header;
    this.body = body;
  };
};

class BlockHeader {
  constructor (version, index, previousHash, timestamp, merkleRoot, difficulty, nonce) {
    this.version = version;
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.merkleRoot = merkleRoot;
    this.difficulty = difficulty;
    this.nonce = nonce;
  };
};

const getVersion = () => {
  const package = fs.readFileSync("package.json");
  return JSON.parse(package).version;
};

const genesisTx = {
  txIns: [{'signature': '', 'txOutId': '', 'txOutIndex': 0}],
  txOuts: [{
    'address': '',
    'amount': 50
  }],
  id: '1dd68a2d273df991618f7d4a02d8fe2b79ac131ca6eb0791d5042b99e247918e'
};

const createGenesisBlock = () => {
  const version = getVersion();
  const index = 0;
  const previousHash = '0'.repeat(64);
  const timestamp = 1231006505  // 2009/01/03 6:15pm (UTC)
  const body = [genesisTx];
  const tree = merkle('sha256').sync(body);
  const merkleRoot = tree.root() || '0'.repeat(64);
  const difficulty = 0;
  const nonce = 0;

  const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce);

  return new Block(header, body);
};

let Blocks = [createGenesisBlock()];

let unspentTxOuts = processTransactions(Blocks[0].body, [], 0);

const getAccountBalance = () => {
  return getBalance(getPublicKeyFromWallet(), unspentTxOuts);
};

const getBlocks = () => {
  return Blocks;
};

const getReverseBlocks = () => {
  reverseBlocks = [...Blocks].reverse();
  return reverseBlocks;
};

const getUnspentTxOuts = () => {
  return _.cloneDeep(unspentTxOuts);
};

const getLastBlock = () => {
  return Blocks[Blocks.length - 1];
};

const addBlock = (newBlock) => {
  const { isValidNewBlock } = require('./checkValidBlock');
  const { broadcast, responseLatestMsg } = require("./p2pServer");
  
  if (isValidNewBlock(newBlock, getLastBlock())) {
    const processedTxs = processTransactions(
      newBlock.body,
      unspentTxOuts,
      newBlock.header.index,
    );
    if (processedTxs === null) {
      console.log("Couldnt process txs");
      return false;
    } else {
      Blocks.push(newBlock);
      unspentTxOuts = processedTxs;
      updateMempool(unspentTxOuts);
      broadcast(responseLatestMsg());
      return true;
    };
  };
  return false;
};

const createHash = (data) => {
  const { version, index, previousHash, timestamp, merkleRoot, difficulty, nonce } = data.header;
  const blockString = version + index + previousHash + timestamp + merkleRoot + difficulty + nonce;
  const hash = cryptojs.SHA256(blockString).toString();
  return hash;
};

const newNextBlock = () => {
  const coinbaseTx = createCoinbaseTx(
    getPublicKeyFromWallet(),
    getLastBlock().header.index + 1,
  );

  const blockData = [coinbaseTx].concat(getMempool());
  return nextBlock(blockData);
};

const sendTx = (address, amount) => {
  const { broadcast, returnMempool } = require("./p2pServer.js");

  const tx = createTx(
    address,
    amount,
    getPrivateKeyFromWallet(),
    unspentTxOuts,
    getMempool()
  );
  addToMempool(tx, unspentTxOuts);
  broadcast(returnMempool());
  return tx;
};

const nextBlock = (bodyData) => {
  const prevBlock = getLastBlock();
  const version = getVersion();
  const index = prevBlock.header.index + 1;
  const previousHash = createHash(prevBlock);
  const timestamp = getTimestamp();
  const tree = merkle('sha256').sync(bodyData);
  const merkleRoot = tree.root() || '0'.repeat(64);
  const difficulty = findDifficulty();
  const newheader = findBlockHeader(
    version,
    index,
    previousHash,
    timestamp,
    merkleRoot,
    difficulty,
  );

  return new Block(newheader, bodyData);
};

const findBlockHeader = (version, index, previousHash, timestamp, merkleRoot, difficulty) => {
  let nonce = 0;
  while(true) {
    let hash = createHeaderHash(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce);
    if (hashMatchesDifficulty(hash, difficulty)) {
      return new BlockHeader(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce);
    };
    nonce++;
  };
};

const createHeaderHash = (version, index, previousHash, timestamp, merkleRoot, difficulty, nonce) => {
  const blockString = version + index + previousHash + timestamp + merkleRoot + difficulty + nonce;
  const hash = cryptojs.SHA256(blockString).toString();
  return hash;
};

const hashMatchesDifficulty = (hash, difficulty) => {
  const hashBinary = hexToBinary(hash);
  const requiredZeros = '0'.repeat(difficulty);

  return hashBinary.startsWith(requiredZeros);
};

const findDifficulty = () => {
  const LastBlock = getLastBlock();
  if (LastBlock.header.index % DIFFICULTY_ADJUSMENT_INTERVAL === 0 && LastBlock.header.index !== 0) {
    return calculateNewDifficulty(LastBlock, getBlocks());
  } else {
    return LastBlock.header.difficulty;
  };
};

const calculateNewDifficulty = (getLastBlock, blockchain) => {
  const lastCalculatedBlock = blockchain[blockchain.length - DIFFICULTY_ADJUSMENT_INTERVAL];
  const timeExpected = BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSMENT_INTERVAL;
  const timeTaken = getLastBlock.header.timestamp - lastCalculatedBlock.header.timestamp;

  if (timeTaken < timeExpected / 2) {
    return lastCalculatedBlock.header.difficulty + 1;
  } else if (timeTaken > timeExpected * 2) {
    return lastCalculatedBlock.header.difficulty - 1;
  } else {
    return lastCalculatedBlock.header.difficulty;
  };
};

const getTimestamp = () => {
  return Math.round(new Date().getTime() / 1000);
};

const sumDifficulty = (anyBlockchain) =>{
  return anyBlockchain
    .map(block => block.header.difficulty)
    .map(difficulty => Math.pow(2, difficulty))
    .reduce((a, b) => a + b);
};

const isValidChain = (blockchainToValidate) => {
  const { isValidNewBlock } = require('./checkValidBlock');

  const isValidGenesis = (block) => {
    return JSON.stringify(block) === JSON.stringify(createGenesisBlock());
  };

  if (!isValidGenesis(blockchainToValidate[0])) {
    console.log(
      "The candidateChains's genesisBlock is not the same as our genesisBlock"
    );
    return false;
  };

  let foreignUTxOuts = [];

  for (let i = 1; i < blockchainToValidate.length; i++) {
    const currentBlock = blockchainToValidate[i];
    if (i !== 0 && !isValidNewBlock(blockchainToValidate[i], blockchainToValidate[i - 1])) {
      return null;
    };

    foreignUTxOuts = processTransactions(
      currentBlock.body,
      foreignUTxOuts,
      currentBlock.header.index
    );

    if (foreignUTxOuts === null) {
      return null;
    }
  };
  return foreignUTxOuts;
};

const replaceChain = (candidateChain) => {
  const { broadcast, responseLatestMsg } = require("./p2pServer");

  const foreignUTxOuts = isValidChain(candidateChain);
  const validChain = foreignUTxOuts !== null;
  if (validChain && sumDifficulty(candidateChain) > sumDifficulty(getBlocks())) {
    Blocks = candidateChain;
    unspentTxOuts = foreignUTxOuts;
    updateMempool(unspentTxOuts);
    broadcast(responseLatestMsg());
    return true;
  } else {
    return false;
  };
};

const handleIncomingTx = (tx) => {
  addToMempool(tx, unspentTxOuts);
};

const getMyUTxO = () => {
  return findUnspentTxOuts(getPublicKeyFromWallet(), getUnspentTxOuts());
};

const gefindMyUTxOutsFromMempool = () => {
  return findMyUTxOutsFromMempool(getMyUTxO(), getMempool());
};

const getFindMyUTxO = () => {
  return findMyUTxOutsFromMyMempool(getMyUTxO(), gefindMyUTxOutsFromMempool());
};

module.exports = {
  getLastBlock,
  createHash,
  getReverseBlocks,
  getBlocks,
  getVersion,
  newNextBlock,
  replaceChain,
  getTimestamp,
  addBlock,
  getUnspentTxOuts,
  getAccountBalance,
  sendTx,
  handleIncomingTx,
  getFindMyUTxO,
  gefindMyUTxOutsFromMempool,
};