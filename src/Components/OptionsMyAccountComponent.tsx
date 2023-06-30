import React from 'react';
import {
    ListItemButton,
    ListSubheader,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
} from '@mui/material';
import {
    Assessment,
    Logout,
    AccountBox,
    Navigation,
    Shield,
    ArrowBackIos,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../State/UserReducer';
import axios from 'axios';

export default function OptionsMyAccountComponent({ _aboutMe, _security }: any) {
    const _user: any = useSelector((state: any) => state.rootUserReducer.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const navigateHome = () => {
        navigate('/home/tags');
    };

    const handleLogOut = () => {
        if (!_user.emailConfirmed) {
            // axios.delete(`User/delete/${_user.email}`).then(() => {
            // });
            dispatch(setLogout());
            navigate('/');
        } else {
            dispatch(setLogout());
            navigate('/');
        }
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <ListItemButton onClick={() => handleLoadOptionsTabAcount(0)}>
                <ListItemIcon>
                    <AccountBox color={chekcIndex === 0 ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText
                    primary="About Me"
                    sx={chekcIndex === 0 ? { color: '#1976d2' } : { color: 'inherit' }}
                />
            </ListItemButton>

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

            <Divider />

            <ListItemButton onClick={navigateHome}>
                <ListItemIcon>
                    <ArrowBackIos sx={{ color: '#1976d2' }} />
                </ListItemIcon>
                <ListItemText
                    primary="Back"
                    sx={{ textDecoration: 'underline', color: '#1976d2' }}
                />
            </ListItemButton>

            <Divider />

            <ListItemButton onClick={handleLogOut} sx={{ mt: '22rem' }}>
                <ListItemIcon>
                    <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Log Out" sx={{ color: '#d32f2f' }} />
            </ListItemButton>
        </Box>
    );
}
