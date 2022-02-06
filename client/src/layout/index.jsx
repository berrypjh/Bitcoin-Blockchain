import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Divider, Toolbar } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar/sidebar';
import { Outlet } from 'react-router-dom';

const MainLayout = (props) => {
    const { blockflag } = props;
    const theme = useTheme();

    return (
        <Box sx={{ display: 'inline-block' }}>
            {/* header */}
            <AppBar
                enableColorOnDark
                display="block"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                }}
            >
                <Toolbar sx={{ height: 0 }} style={{ padding: 0 }} >
                    <Header blockflag={blockflag} />
                </Toolbar>
                <Divider sx={{ mt: 0.25, mb: 1.25 }} />
                <Toolbar style={{ padding: 0, marginTop: "-5px" }} >
                    <Sidebar />
                </Toolbar>
                <Divider sx={{ mt: 0.25, mb: 0.25, marginTop: "-7px" }} />
            </AppBar>

            {/* main content */}
            <Box  style={{ marginTop: "120px"}}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;
