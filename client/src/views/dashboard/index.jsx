import { Grid } from '@mui/material';
import { useState } from 'react';

import MainCard from '../../ui-component/MainCard';
import MainAddressPage from './mainAddress';
import MempoolPage from './Mempool';
import TransactionDefault from './Transaction';
import Clock from 'react-live-clock';

const Dashboard = (props) => {
  const { blockflag } = props;
  const [Flag, setFlag] = useState(false);
  const [Time, setTime] = useState("");

  let onFlag = (e) => {
    setTime(e);
  };

  return (
    <>
      <Clock style={{ display: "none" }} onChange={onFlag} ticking={true} timezone={'US/Pacific'}/>
      <Grid container spacing={2}>
        <Grid item xs={6} md={12}>
          <MainCard title="내 지갑 주소" >
            <MainAddressPage />
          </MainCard>
        </Grid>
        <Grid item xs={6} md={6}>
          <MainCard>
            <TransactionDefault setFlag={setFlag} blockflag={blockflag} Time={Time} />
          </MainCard>
        </Grid>
        <Grid item xs={6} md={6}>
            <MempoolPage Flag={Flag} blockflag={blockflag} Time={Time} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
