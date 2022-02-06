import { Grid } from "@mui/material";
import { useState } from 'react';
import Clock from 'react-live-clock';

import MainCard from "../../ui-component/MainCard";
import MyTransactionPage from "./TxData";
import UnspentTransactionPage from "./UTXO";

const UnspentTransactionDefault = () => {
  const [Time, setTime] = useState("");

  let onFlag = (e) => {
    setTime(e);
  };

  return (
    <>
      <Clock style={{ display: "none" }} onChange={onFlag} ticking={true} timezone={'US/Pacific'}/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MainCard>
            <UnspentTransactionPage Time={Time}/>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard>
            <MyTransactionPage Time={Time}/>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default UnspentTransactionDefault;
