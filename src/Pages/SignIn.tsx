import * as React from 'react';
import { LockOutlined } from '@mui/icons-material';
import {
    Divider,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useGoogleLogin,
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from '@react-oauth/google';
import { UserReducer } from '../State/UserReducer';
import { setLogin } from '../State/UserReducer';
import axios, { AxiosResponse } from 'axios';
import { setToken } from '../State/AuthReducer';
import { Copyright } from '../Components';

export default function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = React.useState('');

    //Login with App
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios
            .post('User/signin', {
                email: data.get('email'),
                password: data.get('password'),
            })
            .then((res: AxiosResponse) => {
                dispatch(setLogin({ user: res.data.user }));
                dispatch(setToken({ token: res.data.token }));
                navigate('/home/tags');
            })
            .catch((error: any) => {
                setError(error.response.data);
            });
    };

    //Login with Google
    const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
        axios
            .post(`User/auth/google`, {
                credential: credentialResponse.credential,
            })
            .then((res: AxiosResponse) => {
                dispatch(setLogin({ user: res.data.result.user }));
                dispatch(setToken({ token: res.data.token }));
                navigate('/home/tags');
            })
            .catch((error) => console.error(`Cannot signin by Google: ${error}`));
    };

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
                    <LockOutlined />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <GoogleOAuthProvider clientId="567968380326-lp6nvrpaqd2a96ho585n5td23bl7aboh.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={(credentialResponse: CredentialResponse) => {
                                    handleGoogleLogin(credentialResponse);
                                }}
                                onError={() => {
                                    console.error('Login Failed');
                                }}
                            />
                        </GoogleOAuthProvider>
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

                    {error && (
                        <Box sx={{ color: '#d32f2f' }}>
                            <Typography>{error}</Typography>
                        </Box>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgotpassword" variant="body2">
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
