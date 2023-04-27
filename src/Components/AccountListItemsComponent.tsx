import React from 'react';
import { ListItemButton, ListSubheader, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Assessment, Logout, AccountBox } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { setLogout } from '../State';
export default function AccountListItemsComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    const handleLogout = () => {
        googleLogout();
        dispatch(setLogout());
        navigate('/signin');
    };

    return (
        <React.Fragment>
            {/* <ListSubheader component="div" inset>
                Account
            </ListSubheader> */}
            <ListItemButton>
                <ListItemIcon>
                    <AccountBox />
                </ListItemIcon>
                <ListItemText primary="Account" />
            </ListItemButton>
            <Divider />
            <ListItemButton sx={{ color: 'red' }} onClick={handleLogout}>
                <ListItemIcon>
                    <Logout color="error" />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
            </ListItemButton>
        </React.Fragment>
    );
}
