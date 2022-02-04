import React, { useEffect, useState } from "react";
import Axios from "axios";

const AddressDefault = () => {
  const [Address, setAddress] = useState("");
  const [Balance, setBalance] = useState("");
  const [TxAddress, setTxAddress] = useState('');
  const [Mempool, setMempool] = useState([]);
  const [MempooltxIns, setMempooltxIns] = useState([]);
  const [MempooltxOuts, setMempooltxOuts] = useState([]);
  const [Amount, setAmount] = useState(0);
  const [Flag, setFlag] = useState(false);

  useEffect(() => {
    Axios.get("/api/balance").then((response) => {
      if (response.data) {
        setBalance(response.data.balance);
      } else {
        alert("실패");
      }
    });
    Axios.get("/api/transactionPool").then((response) => {
      if (response.data) {
        setMempool(response.data);
      } else {
        alert("실패");
      }
    });
  }, [Flag]);

  useEffect(() => {
    Axios.get("/api/address").then((response) => {
      if (response.data) {
        setAddress(response.data);
      } else {
        alert("실패");
      }
    });
  }, []);
  
  const tx = {
    address: TxAddress,
    amount: Amount,
  };

  const onSubmitAddBlock = (e) => {
    e.preventDefault();
    Axios.post("/api/mineBlock").then(() => {
      setFlag(true);
    });
    setFlag(false);
  };

  const onSubmitAddTX = (e) => {
    e.preventDefault();
    Axios.post("/api/addtransactions", tx).then(() => {
        setFlag(true);
    });
    setFlag(false);
  };

  const onTxAddressChange = (e) => {
    setTxAddress(e.target.value);
  };
  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <div>내 지갑주소 : {Address}</div>
      <br />
      <div>내 잔액 : {Balance}</div>
      <br />
      <form onSubmit={onSubmitAddTX}>
        <label>
          <input type="text" value={TxAddress} onChange={onTxAddressChange} />
          <input type="text" value={Amount} onChange={onAmountChange} />
        </label>
        <button>보내기</button>
      </form>
      <br />
      <form onSubmit={onSubmitAddBlock}>
        <button>채굴 하기</button>
      </form>
      <br />
      <hr />
      <div>대기 중인 트랜잭션 목록</div>
      <div>
        {Mempool && Mempool.map((mempool, index) => {
          return (
            <div>
              <hr />
              {index + 1} 번째 목록 
              <p>id : {mempool.id}</p>
              <hr />
              {mempool.txIns.map((txIn) => {
                return (
                  <>
                    <p>signature : {txIn.signature}</p>
                    <p>txOutId : {txIn.txOutId}</p>
                    <p>txOutIndex : {txIn.txOutIndex}</p>
                    <hr />
                  </>
                )
              })}
              {mempool.txOuts.map((txOut) => {
                return (
                  <>
                    <p>address : {txOut.address}</p>
                    <p>amount : {txOut.amount}</p>
                    <hr />
                  </>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  );
};

export default AddressDefault;
