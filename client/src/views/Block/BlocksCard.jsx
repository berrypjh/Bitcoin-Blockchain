import { useState } from "react";
import Axios from "axios";
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, Dialog, DialogActions, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { emphasize, styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Miner = (props) => {
  const MinerAddress = props.block.body[0].txOuts[0].address;

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  const [open, setOpen] = useState(false);
  const [MinerInfo, setMinerInfo] = useState({});

  const handleClickOpen = () => {
    if (!MinerAddress) return;
    
    Axios.get(`/api/address/${MinerAddress}`).then((response) => {
      setMinerInfo(response.data);
    })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledBreadcrumb component="a" onClick={handleClickOpen} label="Unknown" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Miner
        </DialogTitle>
        <DialogContentText  style={{ margin: "20px"}}>
          <DialogContentText id="alert-dialog-description">
            주소 : {MinerAddress && MinerAddress.match(/.{10}/g).join("\n")}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            잔액 : {MinerInfo.balance}
          </DialogContentText>
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose}>CLOSE</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Tx = (props) => {
  let Transaction = props.block.body;
  let TxLength = Transaction.length;

  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  const onClickHandler = () => {
    props.setTransaction(Transaction)
  };
  
  return (
    <>
      <StyledBreadcrumb component="a" onClick={onClickHandler} label={TxLength} />
    </>
  );
};

const BlocksCard = (props) => {
  let { Blocks, setTransaction } = props.data;

  return (
    <>
      {Blocks && Blocks.map((block, index) => {
        return (
          <Accordion key={block.header.index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{block.header.index} 번쨰 블록</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Timestamp : {new Date((block.header.timestamp)*1000).toLocaleString()}
              </Typography>
              <Typography>
                Height : {block.header.index}
              </Typography>
              <Typography>
                Miner : &nbsp;
                {block.header.index !== 0 ? <Miner block={block} /> : "Unknown"}
              </Typography>
              <Typography>
                Number of Transactions : &nbsp;
                {block.header.index !== 0 ? <Tx block={block} setTransaction={setTransaction} /> : 0}
              </Typography>
              <Typography>
                Difficulty :  {block.header.difficulty}
              </Typography>
              <Typography>
                Merkle root :  {block.header.merkleRoot.match(/.{10}/g).join("\n")}
              </Typography>
              <Typography>
                Version :  {block.header.version}
              </Typography>
              <Typography>
                Nonce :  {block.header.nonce}
              </Typography>
              <Typography>
                Block Reward : {block.body[0].txOuts[0].amount} BTC
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default BlocksCard;
