import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const UnspentTransactionPage = (props) => {
  const [MyUTXO, setMyUTXO] = useState([]);

  useEffect(() => {
    Axios.get("/api/myUnspentTransaction").then((response) => {
      setMyUTXO(response.data);
    });
  }, [props.Time]);

  return (
    <>
      <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
        사용 가능한 트랜잭션
      </Typography>
      <Divider sx={{ mt: 0.3, mb: 1.25, marginTop: "10px" }} />
      {MyUTXO && MyUTXO.map((utxo, index) => {
         return (
          <>
            <Box key={utxo.txOutId}>
              <Typography>
                txOutId : {utxo.txOutId.match(/.{10}/g).join("\n")}
              </Typography>
              <Typography>
                txOutIndex : {utxo.txOutIndex}
              </Typography>
              <Typography>
                amount : {utxo.amount}
              </Typography>
              {MyUTXO.length - 1 > index && 
                <Divider variant="middle" sx={{ mt: 1.25, mb: 1.25 }} />
              }
            </Box>
          </>
        );
      })}
    </>
  );
};

export default UnspentTransactionPage;
