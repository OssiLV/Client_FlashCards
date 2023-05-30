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
    Link,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { AppBarComponent, ModalCreate, ModalDelete, ModalUpdate } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { setModal, setTagId } from '../State';
import '../css/loadingstyle.css';

interface ITag {
    id: number;
    name: string;
    description: string;
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function TagPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const _modal = useSelector((state: any) => state.modal);
    const user = useSelector((state: any) => state.user);

    const [page, setPage] = React.useState<number>(1);
    const [tags, setTags] = React.useState<Array<ITag>>([]);
    const [totalPage, setTotalPage] = React.useState<number>(1);

    React.useEffect(() => {
        axios
            .get(`Tag/${user.id}/${page}`)
            .then((res: AxiosResponse) => {
                setTags(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    const forceTagRender = React.useCallback(() => {
        axios
            .get(`Tag/${user.id}/${page}`)
            .then((res: AxiosResponse) => {
                setTags(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Tag/total-page-tag/${user.id}`)
            .then((res: AxiosResponse) => {
                setTotalPage(res.data);
            })
            .catch();
    }, [tags]);

    const handleClickTag = (tagid: number, tagName: string) => {
        navigate(`/home/cards/${tagName}`);
        dispatch(setTagId({ tagId: tagid }));
    };

    const handleEdit = (tagId: number) => {
        dispatch(setTagId({ tagId: tagId }));
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: true,
                    delete: false,
                    sendOTP: false,
                    practice: false,
                    name: 'Update Tag',
                },
            })
        );
    };

    const handleDelete = (tagId: number) => {
        dispatch(setTagId({ tagId: tagId }));
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: true,
                    sendOTP: false,
                    practice: false,
                    name: 'Delete Tag',
                },
            })
        );
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <ModalCreate forceRender={forceTagRender} />
            <ModalUpdate forceRender={forceTagRender} />
            <ModalDelete forceRender={forceTagRender} />
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
                                count={totalPage}
                                color="primary"
                                onChange={(event: React.ChangeEvent<unknown>, page: number) =>
                                    setPage(page)
                                }
                            />
                        </Grid>

                        {/* Recent Deposits */}
                        {tags.toString() !== '' ? (
                            <>
                                {tags.map((tag) => (
                                    <Grid key={tag.id} item xs={12} md={4} lg={3} sm={6}>
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
                                                    onClick={() => handleClickTag(tag.id, tag.name)}
                                                >
                                                    <Typography variant="h5" sx={{ flexGrow: 1 }}>
                                                        {tag.name}
                                                    </Typography>
                                                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                        {tag.description}
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
                                                            onClick={() => handleDelete(tag.id)}
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
                                                            onClick={() => handleEdit(tag.id)}
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
                            </>
                        ) : (
                            <Grid item xs={12} md={4} lg={3} sm={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Box className="balls">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </Box>
                                </Box>
                            </Grid>
                        )}

                        {/* Copyright t */}
                        <Grid item xs={12}>
                            <Copyright />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}
