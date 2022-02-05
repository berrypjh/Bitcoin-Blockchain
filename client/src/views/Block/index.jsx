import Axios from "axios";
import { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import MainCard from "../../ui-component/MainCard";
import AddBlockCard from "./AddBlockCard";
import BlocksCard from "./BlocksCard";

const BlockDefault = () => {
  const [Blocks, setBlocks] = useState([]);

  let data = {
    Blocks,
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
        <Grid item md={6} >
          <MainCard>
            <AddBlockCard />
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
};

export default BlockDefault;
