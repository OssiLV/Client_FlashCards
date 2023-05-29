import React from 'react';
import {
    ListItemButton,
    ListSubheader,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
} from '@mui/material';
import { Assessment, Logout, AccountBox, Navigation, Shield } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { setLogout } from '../State';

function Choosed({ topPosition }: any) {
    return (
        <Navigation
            sx={{
                ml: '1rem',
                rotate: '-90deg',
                position: 'absolute',
                top: topPosition,
                left: 514,
                borderBottom: '1px solid white',
                width: '2.8rem',
            }}
        />
    );
}

export default function OptionsMyAccountComponent({ _aboutMe, _security }: any) {
    const [chekcIndex, setCheckIndex] = React.useState(0);

    const handleLoadOptionsTabAcount = (index: number) => {
        switch (index) {
            case 0:
                _aboutMe();
                setCheckIndex(index);
                break;
            case 1:
                _security();
                setCheckIndex(index);
                break;
            default:
                break;
        }
    };

    return (
        <React.Fragment>
            {/* <ListSubheader component="div" inset>
                Account
            </ListSubheader> */}

            <ListItemButton onClick={() => handleLoadOptionsTabAcount(0)}>
                <ListItemIcon>
                    <AccountBox color={chekcIndex === 0 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="About Me"
                    sx={chekcIndex === 0 ? { color: '#1976d2' } : { color: 'inherit' }}
                />
            </ListItemButton>
            {/* {chekcIndex === 1 ? <Choosed topPosition={168} /> : ''} */}

            <Divider />

            <ListItemButton onClick={() => handleLoadOptionsTabAcount(1)}>
                <ListItemIcon>
                    <Shield color={chekcIndex === 1 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="Security"
                    sx={chekcIndex === 1 ? { color: '#1976d2' } : { color: 'inherit' }}
                />
            </ListItemButton>
            {/* {chekcIndex === 2 ? <Choosed topPosition={218} /> : ''} */}
        </React.Fragment>
    );
}
