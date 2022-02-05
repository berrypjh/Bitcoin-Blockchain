import { useState } from "react";
import Axios from "axios";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const AddBlockCard = () => {
  const [State, setState] = useState({
    successOpen: false,
    errorOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, successOpen, errorOpen } = State;

  let newState = {
    vertical: 'top',
    horizontal: 'center',
  };

  const onSubmitAddBlock = (e) => {
    e.preventDefault();
    Axios.post("/api/mineBlock").then((response) => {
      console.log(response);
      if (response.data.message === false) {
        setState({ errorOpen: true, ...newState });
        return;
      };
      setState({ successOpen: true, ...newState });
    });
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
        variant="text"
        className="sendbutton"
        style={{width: "100%", fontSize: "13px", color: "gray"}}
      >
       채굴하기
      </Button>
    </>
  );

  return (
    <>
      <form onSubmit={onSubmitAddBlock}>
        {buttons}
      </form>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={successOpen}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ backgroundColor: '#20E2D7', width: '100%' }}>
          채굴 시작!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={errorOpen}
        key={vertical + horizontal + false}
      >
        <Alert onClose={handleErrorClose} severity="error" sx={{ backgroundColor: '#ff0844', width: '100%' }}>
          채굴 실패!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddBlockCard;
