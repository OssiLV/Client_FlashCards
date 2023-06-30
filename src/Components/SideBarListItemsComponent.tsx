import * as React from 'react';
import { Divider, Tooltip, Typography } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { TurnedIn, Style, AutoAwesome, Add, AccountBox, Search } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setModal } from '../State/ModalReducer';

export default function SideBarListItemsComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateTag = () => {
        dispatch(
            setModal({
                modal: {
                    create: true,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    practice: false,
                    name: 'Create Tag',
                },
            })
        );
    };

    const handleSearch = () => {
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    practice: true,
                    name: '',
                },
            })
        );
    };
    return (
        <React.Fragment>
            {/* Account */}
            <Tooltip title="Account" placement="right">
                <ListItemButton onClick={() => navigate('/account')}>
                    <ListItemIcon>
                        <AccountBox />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItemButton>
            </Tooltip>

            <Divider />

            {/* Search */}
            <Tooltip title="Search Tag" placement="right">
                <ListItemButton onClick={handleSearch}>
                    <ListItemIcon>
                        <Search />
                    </ListItemIcon>
                    <ListItemText primary="Search Tag" />
                    <Typography sx={{ opacity: 0.6 }} variant="caption">
                        Press "/" to search
                    </Typography>
                </ListItemButton>
            </Tooltip>
            <Divider />

            {/* Tag Page */}
            <Tooltip title="Tag" placement="right">
                <ListItemButton onClick={() => navigate('/home/tags')}>
                    <ListItemIcon>
                        <TurnedIn />
                    </ListItemIcon>
                    <ListItemText primary="Tag" />
                </ListItemButton>
            </Tooltip>

            {/* Create Tag */}
            <Tooltip title="Create Tag" placement="right">
                <ListItemButton onClick={handleCreateTag}>
                    <ListItemIcon>
                        <Add />
                    </ListItemIcon>
                    <ListItemText primary="Create Tag" />
                </ListItemButton>
            </Tooltip>
        </React.Fragment>
    );
}
