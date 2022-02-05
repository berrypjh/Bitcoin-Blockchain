import Axios from "axios";
import { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import BlocksCard from "./BlocksCard";
import TransactionCard from "./TransactionCard";

const BlockDefault = () => {
  const [Blocks, setBlocks] = useState([]);
  const [Transaction, setTransaction] = useState([]);

  let data = {
    Blocks,
    setTransaction,
  };

  useEffect(() => {
    Axios.get("/api/blocks")
      .then((response) => {
        setBlocks(response.data);
      })
  }, []);
  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <BlocksCard data={data}/>
        </Grid>
        <Grid item md={6}>
          <TransactionCard Transaction={Transaction} />
        </Grid>
      </Grid>
    </>
  );
};

export default BlockDefault;
