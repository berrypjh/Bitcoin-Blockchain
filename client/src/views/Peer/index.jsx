import { Grid } from "@mui/material";
import { useState } from "react";
import MainCard from "../../ui-component/MainCard";
import ConnectPeerPage from "./ConnectPeer";
import PeerPage from "./Peer";

const PeerDefault = () => {
  const [SuccessPeer, setSuccessPeer] = useState([]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <MainCard>
            <PeerPage SuccessPeer={SuccessPeer} setSuccessPeer={setSuccessPeer} />
          </MainCard>
        </Grid>
        <Grid item md={6}>
          <MainCard>
            <ConnectPeerPage SuccessPeer={SuccessPeer} />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default PeerDefault;
