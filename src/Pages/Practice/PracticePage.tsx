import React from 'react';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppBarComponent, ModalPractice } from '../../Components';
import { Box } from '@mui/material';

export default function PracticePage() {
    return (
        <Box>
            <ModalPractice />
        </Box>
    );
}
