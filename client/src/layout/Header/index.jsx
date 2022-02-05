import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import LogoSection from '../LogoSection';
import AddBlockCard from '../Block/AddBlockCard';

const Header = () => {
    const theme = useTheme();

    return (
        <>
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
            <Box
                style={{
                    width: 128,
                    paddingTop: "10px",
                    paddingLeft: "28px",
                    paddingBottom: "1px",
                }}
            >
                <Box component="span">
                    <AddBlockCard />
                </Box>
            </Box>
        </>
    );
};

export default Header;
