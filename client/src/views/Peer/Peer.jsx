import { useEffect, useState } from "react";
import { Divider, FormControl, TextField, Typography } from "@mui/material";
import Axios from 'axios';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";

const PeerPage = (props) => {
  const [Peer, setPeer] = useState("");
  const [FlagPeer, setFlagPeer] = useState("");
  const [State, setState] = useState({
    successOpen: false,
    errorOpen: false,
    warningOpen: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, successOpen, errorOpen, warningOpen } = State;

  let newState = {
    vertical: 'top',
    horizontal: 'center',
  };

  const data = {
    peer: [`ws://localhost:${Peer}`],
  };

  useEffect(() => {
    Axios.get("/api/peers").then((response) => {
      props.setSuccessPeer(response.data.peer);
    });
  }, []);

  const onSubmitAddPeer = (e) => {
    e.preventDefault();
    const ws = `127.0.0.1:${Peer}`;
    if (!props.SuccessPeer.includes(ws)) {
      Axios.post("/api/addPeers", data)
        .then((response) => {
          setFlagPeer(response.data.peer);
          Axios.get("/api/peers")
            .then((response) => {
              const peerArray = response.data.peer;
              if (peerArray.includes(ws)) {
                setState({ successOpen: true, ...newState });
                props.setSuccessPeer(props.SuccessPeer.concat(ws));
                setPeer("");
              } else {
                setState({ errorOpen: true, ...newState });
                setPeer("");
              }
            });
        });
    } else {
      setFlagPeer(Peer);
      setState({ warningOpen: true, ...newState });
      setPeer("");
    }
  };

  const onPeerChange = (e) => {
    setPeer(e.target.value);
  };

  const handleClose = () => {
    setState({ ...State, successOpen: false });
  };
  const handleErrorClose = () => {
    setState({ ...State, errorOpen: false });
  };
  const handleWarningClose = () => {
    setState({ ...State, warningOpen: false });
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
       연결하기
      </Button>
    </>
  );

  return (
    <>
        <form onSubmit={onSubmitAddPeer}>
          <FormControl component="block" sx={{ m: 1, width: '100%' }} variant="outlined">
            <TextField
              label="연결 대상 :"
              autoFocus
              id="outlined-start-adornment"
              sx={{ width: '40vw', height: '60px', width: "100%", marginLeft: "-1.5%" }}
              value={Peer}
              onChange={onPeerChange}
              placeholder={"4자리 숫자를 입력해주세요."}
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
          {FlagPeer} 성공!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={errorOpen}
          key={vertical + horizontal + false}
        >
          <Alert onClose={handleErrorClose} severity="error" sx={{ backgroundColor: '#ff0844', width: '100%' }}>
            {FlagPeer} 실패!
          </Alert>
        </Snackbar>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={warningOpen}
          key={vertical + horizontal + true}
        >
          <Alert onClose={handleWarningClose} severity="warning" sx={{ backgroundColor: '#e3eeff', width: '100%' }}>
            {FlagPeer} 는 이미 연결된 상태입니다.
          </Alert>
        </Snackbar>
    </>
  );
};

export default PeerPage;