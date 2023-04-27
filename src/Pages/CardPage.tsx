import * as React from 'react';
import { Box, Toolbar, Typography, Container, Grid, Paper, Pagination } from '@mui/material';
import { AppBarComponent } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tagId = useSelector((state: any) => state.tagId);

    interface ICard {
        id: number;
        title: string;
        translate: string;
    }

    const [page, setPage] = React.useState<number>(1);
    const [cards, setCars] = React.useState<Array<ICard>>([]);
    const [paginatie, setPaginate] = React.useState<number>(1);

    React.useEffect(() => {
        axios
            .get(`Card/TagId/${tagId}/${page}`)
            .then((res) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Card/total-page-card/${tagId}`)
            .then((res) => {
                setPaginate(res.data);
            })
            .catch();
    }, [cards]);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBarComponent />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} display="flex" justifyContent="center">
                            <Pagination
                                count={paginatie}
                                color="secondary"
                                onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                                    setPage(page)
                                }
                            />
                        </Grid>

                        {/* Recent Deposits */}
                        {cards.map((card) => (
                            <Grid key={card.id} item xs={12} md={4} lg={3}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 240,
                                        borderRadius: 4,
                                    }}
                                >
                                    {card.title}
                                </Paper>
                            </Grid>
                        ))}

                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                {/* <Orders /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
