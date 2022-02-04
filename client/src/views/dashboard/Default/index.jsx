import { Grid } from '@mui/material';

import MainBalancePage from '../mainbalance';
import MainCard from '../../../ui-component/MainCard';
import MainTxPage from '../mainTransaction';

const Dashboard = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <MainCard title="잔액" >
                        <MainBalancePage />
                    </MainCard>
                </Grid>
                <Grid item xs={6}>
                    <MainCard title="최근 거래들">
                        <MainTxPage />
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
