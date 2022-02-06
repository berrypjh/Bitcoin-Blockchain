import { Grid } from "@mui/material";
import MainCard from "../../ui-component/MainCard";
import MyTransactionPage from "./TxData";
import UnspentTransactionPage from "./UTXO";

const UnspentTransactionDefault = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MainCard>
            <UnspentTransactionPage />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard>
            <MyTransactionPage />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default UnspentTransactionDefault;
