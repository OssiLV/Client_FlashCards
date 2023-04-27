import * as React from 'react';

import { Box, Button, Typography, Popover } from '@mui/material';
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../State';

export default function MouseOverPopover() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return <Box mx={1}></Box>;
}
