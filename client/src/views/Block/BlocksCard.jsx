import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Tx = (props) => {
  let Transaction = props.block.body;
  let TxLength = Transaction.length;

  return (
    <>
      {TxLength}
    </>
  );
};

const BlocksCard = (props) => {
  let { Blocks, TxIns, TxOuts } = props.data;

  return (
    <>
      {Blocks && Blocks.reverse().map((block, index) => {
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
                이전 Hash 값 : {block.header.previousHash}
              </Typography>
              <Typography>
                Timestamp : {new Date((block.header.timestamp)*1000).toLocaleString()}
              </Typography>
              <Typography>
                Height : {block.header.index}
              </Typography>
              <Typography>
                Miner : 
                {block.body[0].txOuts[0].address}
                 ------ 주소 검색 여기에 더보기 예정 ㅣ Transactions , Total Received , Total Sent , Final Balance
              </Typography>
              <Typography>
                Number of Transactions : 
                <Tx block={block} />
                (버튼 누르면 모듈화로 상세정보 표기 + 위랑 바꿈)
              </Typography>
              <Typography>
                Difficulty :  {block.header.difficulty}
              </Typography>
              <Typography>
                Merkle root :  {block.header.merkleRoot}
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
