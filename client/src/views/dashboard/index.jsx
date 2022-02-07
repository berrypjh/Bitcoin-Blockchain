import { Grid } from '@mui/material';
import { useState } from 'react';
import Clock from 'react-live-clock';

import MainCard from '../../ui-component/MainCard';
import MainAddressPage from './mainAddress';
import MempoolPage from './Mempool';
import TransactionDefault from './Transaction';

const Dashboard = () => {
  const [Flag, setFlag] = useState(false);
  const [Time, setTime] = useState("");

  let onFlag = (e) => {
    setTime(e);
  };

  return (
    <>
      <Clock style={{ display: "none" }} onChange={onFlag} ticking={true} timezone={'US/Pacific'}/>
      <Grid container spacing={2}>
        <Grid item>
          <MainCard title="내 지갑 주소" >
            <MainAddressPage />
          </MainCard>
        </Grid>
        <Grid item>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <MainCard>
                <TransactionDefault setFlag={setFlag} Time={Time} />
              </MainCard>
            </Grid>
            <Grid item xs={12} md={6}>
                <MempoolPage Flag={Flag} Time={Time} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
