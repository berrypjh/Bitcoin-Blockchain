import PropTypes from "prop-types";
import { useState } from "react";
import Axios from "axios";

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const AddBlockCard = () => {
  // const onSubmitAddBlock = (e) => {
  //   e.preventDefault();
  //   Axios.post("/api/mineBlock").then((response) => {
  //     console.log(response);
  //   });
  // };

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
       채굴하기
      </Button>
    </>
  );

  return (
    <>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        key={vertical + horizontal}
        autoHideDuration={3000} 
      >
        <Alert onClose={handleClose} severity="success" sx={{ backgroundColor: '#dadada', width: '100%' }}>
          채굴 시작!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddBlockCard;
