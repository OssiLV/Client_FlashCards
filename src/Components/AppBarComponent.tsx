import React from 'react';
import { Box, Toolbar, IconButton, Typography, Badge, Button, Divider, List } from '@mui/material';
import {
    Menu,
    Notifications,
    ChevronLeft,
    KeyboardArrowDown,
    KeyboardArrowUp,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MouseOverPopover from './MouseOverPopover';

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { googleLogout } from '@react-oauth/google';
import { setLogout } from '../State';
import AccountListItemsComponent from './AccountListItemsComponent';
import SideBarListItemsComponent from './SideBarListItemsComponent';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    })
);

export default function AppBarComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const [open, setOpen] = React.useState(true);
    const [accountOpen, setAccountOpen] = React.useState(true);
    const [title, setTitle] = React.useState<boolean>(true);

    const toggleAccount = () => {
        setAccountOpen(!accountOpen);
    };

    const toggleDrawer = () => {
        setOpen(!open);
        setTitle(!title);
    };

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        {/* <MenuIcon />  */}

                        <Menu />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title ? '' : 'FlashCards'}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <Notifications />
                        </Badge>
                    </IconButton>
                    <Button
                        onClick={toggleAccount}
                        endIcon={accountOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
                        variant="contained"
                        color="secondary"
                        sx={{ px: 2, mx: 2, minWidth: 5 }}
                    >
                        {user.userName}
                    </Button>
                    <Box
                        onMouseLeave={toggleAccount}
                        sx={{
                            position: 'absolute',
                            px: 1,
                            backgroundColor: 'white',
                            color: 'black',
                            borderRadius: 1,
                            right: 20,
                            top: 70,
                            boxShadow:
                                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                            ...(accountOpen && { display: 'none' }),
                        }}
                    >
                        <List component="nav">{<AccountListItemsComponent />}</List>
                    </Box>
                </Toolbar>
                <MouseOverPopover />
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="primary"
                        noWrap
                        sx={{ flexGrow: 1, fontWeight: 2, ml: 1 }}
                    >
                        {title ? 'FlashCards' : ''}
                    </Typography>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeft />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    {<SideBarListItemsComponent />}
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
        </>
    );
}
