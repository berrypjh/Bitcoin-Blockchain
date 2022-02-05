import { Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const MainBalancePage = () => {
    const [Balance, setBalance] = useState(0);

    useEffect(() => {
      Axios.get("/api/balance")
        .then((response) => {
            setBalance(response.data.balance)
        });
    }, []);
    
    return (
        <>
            <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
                사용가능 : {Balance} 
            </Typography>
            <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
                미확정 : 
            </Typography>
            <Divider sx={{ mt: 1.25, mb: 1.25 }} />
            <Typography variant="string" component="div" sx={{ fontSize: '1rem', fontWeight: 500, color: '#868f96', marginBottom: '25px' }}>
                사용가능 : 
            </Typography>
        </>
    );
};

export default MainBalancePage;
