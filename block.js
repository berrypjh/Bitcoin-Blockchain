const fs = require('fs');
const merkle = require('merkle');
const cryptojs = require('crypto-js');
const hexToBinary = require('hex-to-binary');

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

const createGenesisBlock = () => {
  const version = getVersion();
  const index = 0;
  const previousHash = '0'.repeat(64);
  const timestamp = 1231006505  // 2009/01/03 6:15pm (UTC)
  const body = ['hello block'];
  const tree = merkle('sha256').sync(body);
  const merkleRoot = tree.root() || '0'.repeat(64);
  const difficulty = 0;
  const nonce = 0;

  const header = new BlockHeader(version, index, previousHash, timestamp, merkleRoot, difficulty, nonce);

  return new Block(header, body);
};

let Blocks = [createGenesisBlock()];

const getBlocks = () => {
  return Blocks;
};

const getLastBlock = () => {
  return Blocks[Blocks.length - 1];
};

const addBlock = (newBlock) => {
  const { isValidNewBlock } = require('./checkValidBlock');
  const { broadcast, responseLatestMsg } = require("./p2pServer");
  
  if (isValidNewBlock(newBlock, getLastBlock())) {
    Blocks.push(newBlock);
    broadcast(responseLatestMsg());
    return true;
  };
  return false;
};

const createHash = (data) => {
  const { version, index, previousHash, timestamp, merkleRoot, difficulty, nonce } = data.header;
  const blockString = version + index + previousHash + timestamp + merkleRoot + difficulty + nonce;
  const hash = cryptojs.SHA256(blockString).toString();
  return hash;
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

const replaceChain = (candidateChain) => {
  const { broadcast, responseLatestMsg } = require("./p2pServer");

  // const foreignUTxOuts = isChainValid(candidateChain);
  // const validChain = foreignUTxOuts !== null;
  console.log(sumDifficulty(candidateChain));
  console.log(sumDifficulty(getBlocks()));
  if (sumDifficulty(candidateChain) > sumDifficulty(getBlocks())) {
    console.log(111111111111111111);
    Blocks = candidateChain;
    // unspentTxOuts = foreignUTxOuts;
    // updateMempool(unspentTxOuts);
    broadcast(responseLatestMsg());
    return true;
  } else {
    return false;
  };
};

module.exports = {
  Blocks,
  getLastBlock,
  createHash,
  getBlocks,
  getVersion,
  nextBlock,
  replaceChain,
  getTimestamp,
  addBlock,
};