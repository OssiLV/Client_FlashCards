import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Divider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setLogin } from '../State';

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

const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [rememberMe, setRememberMe] = React.useState<Boolean>(false);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    //Login with App
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     rememberMe: data.get('remember') === null ? false : true,
        // });

        axios
            .post('User/signin', {
                email: data.get('email'),
                password: data.get('password'),
                rememberMe: data.get('remember') === null ? false : true,
            })
            .then((res: any) => {
                const data = res.data;
                // console.log(data.user);

                dispatch(setLogin({ token: res.data.token, user: res.data.user }));
                navigate('/home/tags');
            })
            .catch((error: any) => console.error(error));
    };

    //Login with Google
    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const accountGoogle = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );
                const newName = accountGoogle.data.name.replace(/\s+/g, '');
                const newPassword = `SerectPassword ${accountGoogle.data.email} + ${accountGoogle.data.name}`;
                const checkUser = await axios.post('User/checkuser', {
                    email: accountGoogle.data.email,
                });

                if (checkUser.data) {
                    axios
                        .post('User/signin', {
                            email: accountGoogle.data.email,
                            password: newPassword,
                            rememberMe: true,
                        })
                        .then((res) => {
                            dispatch(setLogin({ token: res.data.token, user: res.data.user }));
                            navigate('/home/tags');
                        })
                        .catch((error) => console.error(`Cannot SignIn ${error}`));
                } else {
                    axios
                        .post('User/signup', {
                            userName: newName,
                            email: accountGoogle.data.email,
                            password: newPassword,
                            emailConfirm: true,
                        })
                        .then(() => {
                            axios
                                .post('User/signin', {
                                    email: accountGoogle.data.email,
                                    password: newPassword,
                                    rememberMe: true,
                                })
                                .then((res) => {
                                    dispatch(
                                        setLogin({ token: res.data.token, user: res.data.user })
                                    );
                                    navigate('/home/tags');
                                })
                                .catch((error) => console.error(`Cannot SignIn ${error}`));
                        })
                        .catch((error) => console.error(`Cannot SignIn ${error}`));
                }
            } catch (error) {
                console.error(error);
            }
        },
        onError: () => console.log('Error'),
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Avatar
                            onClick={() => login()}
                            sx={{
                                mx: 1,
                                ':hover': {
                                    bgcolor: '#9c27b0',
                                    cursor: 'pointer',
                                },
                            }}
                            variant="rounded"
                            src="https://eaassets-a.akamaihd.net/resource_signin_ea_com/551.0.20230421.384.b9ef97f/p/images/google.svg"
                        ></Avatar>
                    </Box>

                    <Divider sx={{ my: 1 }} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                    />
                    <FormControlLabel
                        name="remember"
                        control={
                            <Checkbox
                                onChange={() => handleRememberMe()}
                                value={rememberMe}
                                color="primary"
                            />
                        }
                        label="Remember me"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
