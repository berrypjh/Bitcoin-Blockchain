import { Grid } from "@mui/material";
import { useState } from "react";
import MainCard from "../../ui-component/MainCard";
import MempoolPage from "./Mempool";
import TransactionPage from "./Transaction";

const TransactionDefault = () => {
  const [Flag, setFlag] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} >
          <MainCard>
            <TransactionPage setFlag={setFlag} />
          </MainCard>
        </Grid>
        <Grid item md={6}>
          {/* <MainCard> */}
            <MempoolPage Flag={Flag} />
          {/* </MainCard> */}
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionDefault;
