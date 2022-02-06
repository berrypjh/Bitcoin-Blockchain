import { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TransactionCard = (props) => {
  const [expanded, setExpanded] = useState(true);

  let { Transaction } = props;

  const TxInSection = (props) => {
    let TxInArray = props.tx.txIns;
    
    return (
      <>
        {TxInArray && TxInArray.map((tx) => {
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
          </Accordion>
        );
      })}
    </>
  );
};

export default TransactionCard;
