const _ = require("lodash");
const { validateTx } = require("./checkValidTx");

let mempool = [];

const getMempool = () => _.cloneDeep(mempool);

const addToMempool = (tx, uTxOutList) => {
  if (!validateTx(tx, uTxOutList)) {
    throw Error("This tx is invalid. Will not add it to pool");
  } 
  // else if (!isTxValidForPool(tx, mempool)) {
  //   console.log(isTxValidForPool(tx, mempool));
  //   throw Error("This tx is not valid for the pool. Will not add it.");
  // }
  mempool.push(tx);
};

module.exports = {
  getMempool,
  addToMempool,
};