import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import MainLayout from "../layout";
import Dashboard from "./dashboard";
import BlockDefault from "./Block";
import TransactionDefault from "./UnspentTransaction";
import PeerDefault from "./Peer";

const BlockChain = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="block" element={<BlockDefault />} />
        <Route path="transaction" element={<TransactionDefault />} />
        <Route path="peer" element={<PeerDefault />} />
      </Route>
    </Routes>
  );
};

export default BlockChain;
