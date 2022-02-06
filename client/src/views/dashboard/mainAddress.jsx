import React from 'react';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MainAddressPage = () => {
  const [MyAddress, setMyAddress] = useState("");

  useEffect(() => {
    Axios.get("/api/address").then((response) => {
      setMyAddress(response.data);
    });
  }, []);

  return (
    <>
      <Typography variant="string" component="span" sx={{ mt: 1.25, fontSize: '1rem', fontWeight: 500, color: '#868f96' }}>
        {MyAddress && MyAddress.match(/.{50}/g).join("\n")}
      </Typography>

      <CopyToClipboard text={MyAddress} style={{ marginLeft: "10px" }}>
        <ContentCopyIcon />
      </CopyToClipboard>
    </>
  );
};

export default MainAddressPage;
