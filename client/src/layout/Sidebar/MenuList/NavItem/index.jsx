import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const NavItem = ({ item, level }) => {
    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon />
    );

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    let listItemProps = {
        component: forwardRef((props, ref) => <Link ref={ref} {...props} to={`${item.url}`} target={itemTarget} />)
    };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
                display:"inline-block",
                marginLeft: "-10px"
            }}
        >
            <ListItemIcon>
                {itemIcon} 
                <ListItemText
                    sx={{
                        pl: `${level * 4}px`,
                        pr: `${level * 8}px`,
                    }}
                    primary={
                        <Typography variant='h5' color="inherit">
                            {item.title}
                        </Typography>
                    }
                />
            </ListItemIcon>
        </ListItemButton>
    );
};

export default NavItem;
