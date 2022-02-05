import { useState } from "react";
import Axios from 'axios';
import { Divider, FormControl, TextField } from "@mui/material";
import MainCard from "../../ui-component/MainCard";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const TransactionDefault = () => {
  const [SendAddress, setSendAddress] = useState("");
  const [Amount, setAmount] = useState("");
  const [State, setState] = useState({
    successOpen: false,
    errorOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, successOpen, errorOpen } = State;

  const data = {
    address: SendAddress,
    amount: Amount,
  };

  const onSubmitAddBlock = (e) => {
    e.preventDefault();
    Axios.post("/api/addtransactions", data).then((response) => {
      let newState = {
        vertical: 'top',
        horizontal: 'center',
      };

      if (response.data.message === false) {
        setState({ errorOpen: true, ...newState });
        return;
      };
      setState({ successOpen: true, ...newState });
    });
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
      <MainCard>
        <form onSubmit={onSubmitAddBlock}>
          <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
            <TextField
              label="송금할 대상 :"
              autoFocus
              id="outlined-start-adornment"
              sx={{ width: '40vw', height: '60px', width: "100%", marginLeft: "-1.5%" }}
              value={SendAddress}
              onChange={onSendAddressChange}
              placeholder={"코인 주소를 입력하세요 (예: 1NS17iag9jJgTHDIVXjvLCEnZuQ3rJDE9L)"}
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
        <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "10px" }} />
        mempool 예정
      </MainCard>
    </>
  );
};

export default TransactionDefault;