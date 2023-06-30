import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Shuffle, ShortText } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

export default function PracticePage() {
    const theme = useTheme();
    const isMobile = useMediaQuery('(max-width:570px)');

    const navigate = useNavigate();

    const handleNavigatePreviousPage = () => {
        window.history.back();
    };

    const handleClickOptions = (option: string) => {
        navigate(`/practice/${option}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                overflow: 'auto',
            }}
        >
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                }}
            >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} sx={{ mt: 4 }}>
                            <Typography
                                align="center"
                                variant="h5"
                                color="#1976d2"
                                fontWeight="bold"
                                letterSpacing={8}
                            >
                                CHOOSE YOUR OPTION
                            </Typography>
                        </Grid>
                    </Box>
                    {/* <Grid container spacing={3}> */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: 2,
                            flexDirection: `${isMobile ? 'column' : 'row'}`,
                            gap: 3,
                        }}
                    >
                        <Paper
                            onClick={() => handleClickOptions('shuffle')}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '10rem',
                                borderRadius: 4,
                                width: '16rem',
                                ':hover': {
                                    borderBottom: '1.5px solid #1976d2',
                                    cursor: 'pointer',
                                    color: '#1976d2',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ letterSpacing: 5.4, fontWeight: 'bold' }}
                                >
                                    SHUFFLE
                                </Typography>
                                <Shuffle sx={{ mt: 1 }} />
                            </Box>
                        </Paper>
                        {/*  */}
                        <Paper
                            onClick={() => handleClickOptions('typing')}
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                height: '10rem',
                                borderRadius: 4,
                                width: '16rem',
                                ':hover': {
                                    borderBottom: '1.5px solid #1976d2',
                                    cursor: 'pointer',
                                    color: '#1976d2',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ letterSpacing: 5.4, fontWeight: 'bold' }}
                                >
                                    TYPING
                                </Typography>
                                <ShortText sx={{ mt: 1 }} />
                            </Box>
                        </Paper>
                    </Box>

                    {/* Recent Orders */}
                    {/* </Grid> */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid item xs={12} sx={{ mt: 4 }}>
                            {'____________'}
                            <Button
                                sx={{ letterSpacing: 3 }}
                                size="large"
                                variant="text"
                                onClick={() => handleNavigatePreviousPage()}
                            >
                                Back
                            </Button>
                            {'____________'}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
