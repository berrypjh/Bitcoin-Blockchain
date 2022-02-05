import { Typography } from '@mui/material';
import { useEffect } from 'react';

const MainTxPage = () => {
    useEffect(() => {
      // 최근 거래들 요청
    }, []);
    
    return (
        <>
            <Typography variant="string" component="div" sx={{ fontSize: '1rem', fontWeight: 500, color: '#868f96', marginBottom: '25px' }}>
                트랜잭션 예정
            </Typography>
        </>
    );
};

export default MainTxPage;
