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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    useGoogleLogin,
    CredentialResponse,
    GoogleLogin,
    GoogleOAuthProvider,
} from '@react-oauth/google';
import { setLogin } from '../State';
import axios, { AxiosResponse } from 'axios';

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
            .then((res: AxiosResponse) => {
                // console.log(data.user);

                dispatch(setLogin({ token: res.data.token, user: res.data.user }));
                navigate('/home/tags');
            })
            .catch((error: any) => console.error(error));
    };

    //Login with Google

    const handleGoogleLogin = (credentialResponse: CredentialResponse) => {
        // console.log(credentialResponse.credential);

        axios
            .post(`User/auth/google`, {
                credential: credentialResponse.credential,
            })
            .then((res: AxiosResponse) => {
                dispatch(setLogin({ token: res.data.result.token, user: res.data.result.user }));
                navigate('/home/tags');
                // console.log({ res });
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
