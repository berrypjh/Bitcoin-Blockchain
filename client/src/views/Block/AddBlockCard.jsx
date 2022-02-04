import PropTypes from "prop-types";
import { useState } from "react";
import Axios from "axios";

const AddBlockCard = () => {
  const [TxAddress, setTxAddress] = useState('');
  const [Amount, setAmount] = useState(0);

  const tx = {
    address: TxAddress,
    amount: Amount,
  };

  const onSubmitAddBlock = (e) => {
    e.preventDefault();
    Axios.post("/api/mineBlock").then((response) => {
      console.log(response);
    });
  };

  const onSubmitAddTX = (e) => {
    e.preventDefault();
    Axios.post("/api/addtransactions", tx).then((response) => {
      console.log(response);
    });
  };

  const onTxAddressChange = (e) => {
    setTxAddress(e.target.value);
  };
  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <>
      <form onSubmit={onSubmitAddTX}>
        <label>
          <input type="text" value={TxAddress} onChange={onTxAddressChange} />
          <input type="text" value={Amount} onChange={onAmountChange} />
        </label>
        <button>보내기</button>
      </form>
      <form onSubmit={onSubmitAddBlock}>
        <button>채굴 하기</button>
      </form>
    </>
  );
};

AddBlockCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default AddBlockCard;
