import { Grid } from "@mui/material";
import MainCard from "../../ui-component/MainCard";
import DBTransactionPage from "./TxData";
import UnspentTransactionPage from "./UTXO";

const UnspentTransactionDefault = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} >
          <MainCard>
            <UnspentTransactionPage />
          </MainCard>
        </Grid>
        <Grid item md={6}>
          <MainCard>
            <DBTransactionPage />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default UnspentTransactionDefault;
