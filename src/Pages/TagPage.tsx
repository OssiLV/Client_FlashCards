import * as React from 'react';
import {
    Box,
    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,
    Pagination,
    IconButton,
    Button,
    Tooltip,
} from '@mui/material';
import { Close, Edit } from '@mui/icons-material';
import { AppBarComponent } from '../Components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setTagId } from '../State';

export default function TagPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);

    interface ITag {
        id: number;
        name: string;
        description: string;
    }

    const [page, setPage] = React.useState<number>(1);
    const [tags, setTags] = React.useState<Array<ITag>>([]);
    const [paginatie, setPaginate] = React.useState<number>(1);

    React.useEffect(() => {
        axios
            .get(`Tag/${user.id}/${page}`)
            .then((res) => {
                setTags(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    React.useEffect(() => {
        axios
            .get(`Tag/total-page-tag/${user.id}`)
            .then((res) => {
                setPaginate(res.data);
            })
            .catch();
    }, [tags]);

    const handleClickTag = (tagid: number) => {
        navigate(`/home/cards/${tagid}`);
        dispatch(setTagId({ tagId: tagid }));
    };

    const handleDelete = (tagId: number) => {
        axios
            .delete(`Tag/delete/${tagId}`)
            .then(() => window.location.reload())
            .catch((error) => console.error(`Cannot delete tag: ${error}`));
    };

    const handleEdit = (tagId: number) => {
        axios
            .put('Tag/edit', {
                id: tagId,
                name: 'edited',
                description: '',
            })
            .then(() => {})
            .catch((error) => console.error(`Cannot update: ${error}`));
    };
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
                        {tags.map((tag) => (
                            <Grid
                                key={tag.id}
                                item
                                // sx={{ display: 'flex' }}
                                xs={12}
                                md={4}
                                lg={3}
                                sm={6}
                            >
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
                                            onClick={() => handleClickTag(tag.id)}
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
                                    {/* <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        
                                    >
                                        Open
                                    </Button> */}
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
