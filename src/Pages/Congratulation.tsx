import { Avatar, Box, Button, Icon, ImageListItem, Typography } from '@mui/material';
import React from 'react';
import ImageCongratulation from '../images/congratulation.png';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

const Congratulation = () => {
    const naviagte = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <ImageListItem sx={{ width: '10rem', height: '10rem' }}>
                    <img src={ImageCongratulation} />
                </ImageListItem>
                <Typography
                    variant="h6"
                    color="#1976d2"
                    align="center"
                    sx={{ mt: '3rem', letterSpacing: 2 }}
                >
                    CONGRATULATION
                </Typography>
                <Typography
                    variant="h4"
                    color="#1976d2"
                    align="center"
                    sx={{ mt: '3rem', letterSpacing: 5, textTransform: 'uppercase' }}
                >
                    your're completed practice
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        mt: 4,
                    }}
                >
                    {'____________'}
                    <Button
                        sx={{ letterSpacing: 3, mx: 1 }}
                        size="medium"
                        variant="contained"
                        onClick={() => naviagte('/home/tags')}
                    >
                        Back
                    </Button>
                    {'____________'}
                </Box>
            </Box>
        </Box>
    );
};

export default Congratulation;
