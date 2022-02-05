import React, { useEffect, useState } from "react";
import Axios from "axios";
import MainCard from "../../ui-component/MainCard";
import { Divider, Typography } from "@mui/material";

const DBTransactionPage = () => {
  const [AAAA, setAAAA] = useState("");

  const onTxWalletChange = (e) => {
    setAAAA(e.target.value);
  };

  return (
    <>
      <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
        DB 안의 모든 거래내역
      </Typography>
      <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "10px" }} />
    </>
  );
};

export default DBTransactionPage;
