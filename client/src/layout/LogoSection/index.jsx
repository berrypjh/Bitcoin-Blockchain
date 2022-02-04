import { Link } from 'react-router-dom';

import { Box, ButtonBase, ListItemText, Typography } from '@mui/material';

const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={"/"}>
        <Box
            component="img"
            sx={{
                height: "1em",
                width: "1em",
            }}
            alt="Berry Core"
            src="bitcoin.svg"
        />
        <ListItemText
            sx={{
                pl: `4px`,
            }}
            primary={
                <Typography 
                    color="#330867"
                    fontSize="0.5em"
                >
                    Berry Core
                </Typography>
            }
        />
    </ButtonBase>
);

export default LogoSection;
