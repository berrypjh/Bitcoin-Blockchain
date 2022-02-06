import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout";
import Dashboard from "./dashboard";
import BlockDefault from "./Block";
import TransactionDefault from "./UnspentTransaction";
import PeerDefault from "./Peer";

const BlockChain = () => {
  const [BlockFlag, setBlockFlag] = useState(false);

  const flag = {
    BlockFlag,
    setBlockFlag,
  };

  return (
    <Routes>
      <Route path="/*" element={<MainLayout blockflag={flag} />}>
        <Route path="" element={<Dashboard blockflag={flag} />} />
        <Route path="block" element={<BlockDefault />} />
        <Route path="transaction" element={<TransactionDefault blockflag={flag} />} />
        <Route path="peer" element={<PeerDefault />} />
      </Route>
    </Routes>
  );
};

export default BlockChain;
