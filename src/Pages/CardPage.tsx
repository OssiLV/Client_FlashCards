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
    Button,
} from '@mui/material';
import { AppBarComponent, ModalCreate, ModalDelete, ModalUpdate } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Close, Edit } from '@mui/icons-material';
import { setModal } from '../State/ModalReducer';
import { setCurrentCardPage, setCardId } from '../State/CurrentValueReducer';

interface ICardPage {
    _cards: ICard[];
}
interface ICard {
    id: number;
    title: string;
    translate: string;
    status: string;
}

const CardPage: React.FC<ICardPage> = ({ _cards }) => {
    const dispatch = useDispatch();
    const _tagId = useSelector((state: any) => state.rootCurrentValueReducer.tagId);
    const _currentCardPage = useSelector(
        (state: any) => state.rootCurrentValueReducer.currentCardPage
    );

    const [page, setPage] = React.useState<number>(1);
    const [cards, setCars] = React.useState<Array<ICard>>([]);
    const [totalPage, setTotalPage] = React.useState<number>(1);

    React.useEffect(() => {
        dispatch(setCurrentCardPage({ currentCardPage: page }));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Card/${_tagId}/${page}`)
            .then((res: AxiosResponse) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Cards data: ${error}`));
    }, [page, _tagId]);

    const forceCardRender = React.useCallback(() => {
        axios
            .get(`Card/${_tagId}/${page}`)
            .then((res: AxiosResponse) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Cards data: ${error}`));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Card/total-page-card/${_tagId}`)
            .then((res: AxiosResponse) => {
                setTotalPage(res.data);
            })
            .catch();
    }, [cards]);

    const handleCreateCard = () => {
        dispatch(
            setModal({
                modal: {
                    create: true,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    practice: false,
                    name: 'Create Card',
                },
            })
        );
    };

    const handleEdit = (cardId: number) => {
        dispatch(setCardId({ cardId: cardId }));
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: true,
                    delete: false,
                    sendOTP: false,
                    practice: false,
                    name: 'Update Card',
                },
            })
        );
    };

    const handleDelete = (cardId: number) => {
        dispatch(setCardId({ cardId: cardId }));
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: true,
                    sendOTP: false,
                    practice: false,
                    name: 'Delete Card',
                },
            })
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
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Button
                                size="small"
                                variant="outlined"
                                sx={{ mx: 2 }}
                                onClick={() => handleCreateCard()}
                            >
                                Create Card
                            </Button>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{ mx: 2 }}
                                onClick={() => window.location.assign('/practice')}
                            >
                                Practice
                            </Button>
                        </Grid>
                        {/* Recent Deposits */}
                        {cards.map((card) => (
                            <Grid key={card.id} item xs={12} md={4} lg={3} sm={6}>
                                <Box sx={{}}>
                                    <Paper
                                        sx={
                                            card?.status === 'pending'
                                                ? {
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
                                                  }
                                                : card.status === 'completed'
                                                ? {
                                                      borderLeft: '2px solid #2e7d32',
                                                      borderRight: '2px solid #2e7d32',
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
                                                  }
                                                : {
                                                      borderLeft: '2px solid #d32f2f',
                                                      borderRight: '2px solid #d32f2f',
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
                                                  }
                                        }
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                flexGrow: 1,
                                            }}
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
                                </Box>
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
};

export default CardPage;
