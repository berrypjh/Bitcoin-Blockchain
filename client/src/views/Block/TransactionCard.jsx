import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from "@mui/material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TransactionCard = (props) => {
  const [expanded, setExpanded] = useState(true);

  let { Transaction } = props;

  const TxInSection = (props) => {
    let TxInArray = props.tx.txIns;
    
    return (
      <>
        {TxInArray && TxInArray.map((tx, index) => {
          if (!tx.txOutId) {
            return (
              <>
                COINBASE (Newly Gemerate Coins)
              </>
            );
          };
          
          return (
            <>
              <Typography>txOutId : {tx.txOutId.match(/.{10}/g).join("\n")}</Typography>
              <Typography>txOutIndex : {tx.txOutIndex}</Typography>
              {TxInArray.length - 1 > index && 
                <Divider variant="middle" sx={{ mt: 1.25, mb: 1.25 }} />
              }
            </>
          );
        })}
      </>
    )
  }
  const TxOutSection = (props) => {
    let TxOutArray = props.tx.txOuts;
    
    return (
      <>
        {TxOutArray && TxOutArray.map((tx, index) => {
          return (
            <>
              <Typography>address : {tx.address.match(/.{10}/g).join("\n")}</Typography>
              <Typography>amount : {tx.amount}</Typography>
              {TxOutArray.length - 1 > index && 
                <Divider variant="middle" sx={{ mt: 1.25, mb: 1.25 }} />
              }
            </>
          );
        })}
      </>
    )
  }

  const handleChange = () => {
    if (expanded) {
      setExpanded(false);
      return;
    };
    setExpanded(true);
  };

  return (
    <>
      {Transaction && Transaction.map((tx) => {
        return (
          <Accordion expanded={expanded} onChange={handleChange} key={tx.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>ID - {tx.id.match(/.{10}/g).join("\n")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TxInSection tx={tx} />
            </AccordionDetails>
            <AccordionDetails style={{ textAlign: "center" }}>
              <ArrowCircleDownIcon />
            </AccordionDetails>
            <AccordionDetails>
              <TxOutSection tx={tx} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default TransactionCard;
