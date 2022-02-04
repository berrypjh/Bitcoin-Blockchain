import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";

import MainLayout from "./layout";
import Dashboard from "./views/dashboard/Default";
import TransactionDefault from "./views/Transaction";
import BlockDefault from "./views/Block";
import WalletDefault from "./views/Wallet";
import PeerDefault from "./views/Peer";

import themes from "./themes";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <Routes>
          <Route path="/*" element={<MainLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="transaction" element={<TransactionDefault />} />
            <Route path="block" element={<BlockDefault />} />
            <Route path="wallet" element={<WalletDefault />} />
            <Route path="peer" element={<PeerDefault />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
