import { useState } from "react";
import { Divider, FormControl, InputAdornment, TextField, Typography } from "@mui/material";
import MainCard from "../../ui-component/MainCard";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const TransactionDefault = () => {
  const [AAAA, setAAAA] = useState("");

  const onTxAddressChange = (e) => {
    setAAAA(e.target.value);
  };

  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <>
      <Button
        onClick={handleClick({
          vertical: 'top',
          horizontal: 'center',
        })}
      >
       보내기
      </Button>
    </>
  );

  return (
    <>
      <MainCard>
        <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
          <TextField
            fullWidth
            label="송금할 대상 :"
            autoFocus
            id="outlined-start-adornment"
            sx={{ width: '40vw', height: '60px' }}
            value={AAAA}
            onChange={onTxAddressChange}
            placeholder={"코인 주소를 입력하세요 (예: 1NS17iag9jJgTHDIVXjvLCEnZuQ3rJDE9L)"}
          />
        </FormControl>
        <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
          <TextField
            fullWidth
            label="금액 :"
            id="amount"
            sx={{ width: '40vw', height: '80px' }}
            value={AAAA}
            onChange={onTxAddressChange}
            placeholder={"0"}
          />
        </FormControl>
        {buttons}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          key={vertical + horizontal}
          autoHideDuration={3000} 
        >
          <Alert onClose={handleClose} severity="success" sx={{ backgroundColor: '#dadada', width: '100%' }}>
            성공
          </Alert>
        </Snackbar>
        <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "-7px" }} />
        mempool 예정
      </MainCard>
    </>
  );
};

export default TransactionDefault;