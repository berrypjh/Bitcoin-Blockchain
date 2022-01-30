const fs = require('fs')
const merkle = require('merkle')

class Block {
  constructor(header, body) {
    this.header = header
    this.body = body
  }
}

class BlockHeader {
  constructor (version, previousHash, timestamp, merkleRoot, bit, nonce) {
    this.version = version
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.merkleRoot = merkleRoot
    this.bit = bit
    this.nonce = nonce
  }
}

function getVersion() {
  const package = fs.readFileSync("package.json")
  return JSON.parse(package).version
}

function createGenesisBlock() {
  const version = getVersion()
  const previousHash = '0'.repeat(64)
  const timestamp = parseInt(Date.now() / 1000)
  const body = ['hello block']
  const tree = merkle('sha256').sync(body)
  const merkleRoot = tree.root() || '0'.repeat(64)
  const bit = 0
  const nonce = 0

  const header = new BlockHeader(version, previousHash, timestamp, merkleRoot, bit, nonce)

  return new Block(header, body)
}

const block = createGenesisBlock()
console.log(block);