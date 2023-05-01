import * as React from 'react';
import { Tooltip } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { TurnedIn, Style, AutoAwesome } from '@mui/icons-material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function SideBarListItemsComponent() {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            {/* Tag Page */}
            <Tooltip title="Tag" placement="right">
                <ListItemButton onClick={() => navigate('/home/tags')}>
                    <ListItemIcon>
                        <TurnedIn />
                    </ListItemIcon>
                    <ListItemText primary="Tag" />
                </ListItemButton>
            </Tooltip>

            {/* Card Page */}
            {/* <Tooltip title="Card" placement="right">
                <ListItemButton onClick={() => navigate('/home/cards')}>
                    <ListItemIcon>
                        <Style />
                    </ListItemIcon>
                    <ListItemText primary="Card" />
                </ListItemButton>
            </Tooltip> */}

            {/* Practice Page */}
            <Tooltip title="Practice" placement="right">
                <ListItemButton>
                    <ListItemIcon>
                        <AutoAwesome />
                    </ListItemIcon>
                    <ListItemText primary="Practice" />
                </ListItemButton>
            </Tooltip>
        </React.Fragment>
    );
}
