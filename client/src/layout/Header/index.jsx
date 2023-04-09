import { Box, Grid } from "@mui/material";

import LogoSection from "../LogoSection";
import AddBlockCard from "../Block/AddBlockCard";

const Header = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box
            style={{
              width: 128,
              paddingTop: "10px",
              paddingLeft: "28px",
              paddingBottom: "1px",
            }}
          >
            <Box component="span">
              <LogoSection />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <AddBlockCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
