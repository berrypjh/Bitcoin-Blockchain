import Axios from "axios";
import { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import BlocksCard from "./BlocksCard";
import TransactionCard from "./TransactionCard";
import Clock from 'react-live-clock';

const BlockDefault = () => {
  const [Blocks, setBlocks] = useState([]);
  const [Transaction, setTransaction] = useState([]);
  const [Time, setTime] = useState("");

  let data = {
    Blocks,
    setTransaction,
  };

  let onFlag = (e) => {
    setTime(e);
  };

  useEffect(() => {
    Axios.get("/api/blocks")
      .then((response) => {
        setBlocks(response.data);
      })
  }, [Time]);
  
  return (
    <>
      <Clock style={{ display: "none" }} onChange={onFlag} ticking={true} timezone={'US/Pacific'}/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BlocksCard data={data}/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionCard Transaction={Transaction} />
        </Grid>
      </Grid>
    </>
  );
};

export default BlockDefault;
