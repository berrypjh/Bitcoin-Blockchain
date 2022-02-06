import { useEffect, useState } from "react";
import Axios from 'axios';
import { FormControl, TextField, Typography } from "@mui/material";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const TransactionDefault = (props) => {
  const [SendAddress, setSendAddress] = useState("");
  const [Amount, setAmount] = useState("");
  const [State, setState] = useState({
    successOpen: false,
    errorOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [Balance, setBalance] = useState(0);

  const { vertical, horizontal, successOpen, errorOpen } = State;

  const data = {
    address: SendAddress,
    amount: Amount,
  };

  useEffect(() => {
    Axios.get("/api/balance")
      .then((response) => {
          setBalance(response.data.balance)
      });
  }, [props.blockflag, props.Time]);

  let newState = {
    vertical: 'top',
    horizontal: 'center',
  };

  const onSubmitAddBlock = (e) => {
    e.preventDefault();
    Axios.post("/api/addtransactions", data).then((response) => {
      if (response.data.message === false) {
        setState({ errorOpen: true, ...newState });
        return;
      };
      setState({ successOpen: true, ...newState });
      setSendAddress("");
      setAmount("");
      props.setFlag(true);
    });
    props.setFlag(false);
  };

  const onSendAddressChange = (e) => {
    setSendAddress(e.target.value);
  };

  const onAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleClose = () => {
    setState({ ...State, successOpen: false });
  };
  const handleErrorClose = () => {
    setState({ ...State, errorOpen: false });
  };

  const buttons = (
    <>
      <Button
        type="submit"
        color="secondary"
        variant="outlined"
        className="sendbutton"
        style={{width: "100%"}}
      >
       보내기
      </Button>
    </>
  );

  return (
    <>
      <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', marginBottom: '8px', fontWeight: 500, color: '#868f96' }}>
        사용가능 : {Balance} BTC
      </Typography>
      <form onSubmit={onSubmitAddBlock}>
        <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
          <TextField
            label="송금할 대상 :"
            autoFocus
            id="outlined-start-adornment"
            sx={{ width: '40vw', height: '60px', width: "100%", marginLeft: "-1.5%" }}
            value={SendAddress}
            onChange={onSendAddressChange}
            placeholder={"코인 주소를 입력하세요 (예: 044f732ce133baf8bb06e21b75f9114790b...)"}
          />
        </FormControl>
        <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
          <TextField
            label="금액 :"
            id="amount"
            sx={{ width: '40vw', height: '80px', width: "100%", marginLeft: "-1.5%" }}
            value={Amount}
            onChange={onAmountChange}
            placeholder={"0"}
          />
        </FormControl>
        {buttons}
      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successOpen}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ backgroundColor: '#20E2D7', width: '100%' }}>
          성공
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorOpen}
        key={vertical + horizontal + false}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ backgroundColor: '#ff0844', width: '100%' }}>
          실패
        </Alert>
      </Snackbar>
    </>
  );
};

export default TransactionDefault;