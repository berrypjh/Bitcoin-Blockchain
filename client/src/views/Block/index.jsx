import Axios from "axios";
import { useEffect, useState } from "react";
import AddBlockCard from "./AddBlockCard";
import BlocksCard from "./BlocksCard";

const BlockDefault = () => {
  const [Blocks, setBlocks] = useState([]);

  useEffect(() => {
    // setInterval(() => {
      Axios.get("/api/blocks").then((response) => {
        setBlocks(response.data)
      });
    // }, 1000);
  }, [Blocks]);

  return (
    <>
      <AddBlockCard />
      <BlocksCard Blocks={Blocks}/>
    </>
  );
};

export default BlockDefault;
