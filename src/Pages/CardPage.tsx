import * as React from 'react';
import {
    Box,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Pagination,
    Tooltip,
} from '@mui/material';
import { AppBarComponent, ModalCreate, ModalDelete, ModalUpdate } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Close, Edit } from '@mui/icons-material';
import { setCardId, setModal } from '../State';

interface ICard {
    id: number;
    title: string;
    translate: string;
}

export default function CardPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tagId = useSelector((state: any) => state.tagId);

    const [page, setPage] = React.useState<number>(1);
    const [cards, setCars] = React.useState<Array<ICard>>([]);
    const [totalPage, setTotalPage] = React.useState<number>(1);

    React.useEffect(() => {
        axios
            .get(`Card/${tagId}/${page}`)
            .then((res) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    const forceCardRender = React.useCallback(() => {
        axios
            .get(`Card/${tagId}/${page}`)
            .then((res) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Card/total-page-card/${tagId}`)
            .then((res) => {
                setTotalPage(res.data);
            })
            .catch();
    }, [cards]);

    const handleEdit = (cardId: number) => {
        dispatch(setCardId({ cardId: cardId }));
        dispatch(
            setModal({ modal: { create: false, update: true, delete: false, name: 'Update Card' } })
        );
    };

    const handleDelete = (cardId: number) => {
        dispatch(setCardId({ cardId: cardId }));
        dispatch(
            setModal({ modal: { create: false, update: false, delete: true, name: 'Delete Card' } })
        );
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <ModalCreate forceRender={forceCardRender} />
            <ModalUpdate forceRender={forceCardRender} />
            <ModalDelete forceRender={forceCardRender} />
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
                        {/* <Typography variant="h6">{'Tag Name'}</Typography> */}
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Pagination
                                count={totalPage}
                                color="secondary"
                                onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                                    setPage(page)
                                }
                            />
                        </Grid>

                        {/* Recent Deposits */}
                        {cards.map((card) => (
                            <Grid key={card.id} item xs={12} md={4} lg={3} sm={6}>
                                <Paper
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
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexGrow: 20,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                                {card?.title}
                                            </Typography>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {card?.translate}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                flexGrow: 1,
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Tooltip title="Delete" placement="right">
                                                <Close
                                                    onClick={() => handleDelete(card.id)}
                                                    color="error"
                                                    sx={{
                                                        mb: 3,
                                                        flexGrow: 1,
                                                        ':hover': {
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                />
                                            </Tooltip>

                                            <Tooltip title="Edit" placement="right">
                                                <Edit
                                                    onClick={() => handleEdit(card.id)}
                                                    color="primary"
                                                    sx={{
                                                        flexGrow: 5,
                                                        mb: 1,
                                                        ':hover': {
                                                            cursor: 'pointer',
                                                        },
                                                    }}
                                                />
                                            </Tooltip>
                                        </Box>
                                    </Box>
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
