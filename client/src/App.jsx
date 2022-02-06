import { useSelector } from "react-redux";

import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";

import themes from "./themes";
import BlockChain from "./views/BlockChain";

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <BlockChain />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
