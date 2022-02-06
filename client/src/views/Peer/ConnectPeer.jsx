import React from 'react';
import { Divider, Typography } from '@mui/material';

const ConnectPeerPage = (props) => {
  return (
    <>
      <Typography variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
        연결된 피어
      </Typography>
      <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "10px" }} />
      
      {props.SuccessPeer && props.SuccessPeer.map((peer) => {
        return (
          <Typography key={peer} variant="string" component="div" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
            {peer}
          </Typography>
        );
      })}
    </>
  );
};

export default ConnectPeerPage;
