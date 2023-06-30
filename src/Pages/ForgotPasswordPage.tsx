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
import { setModal } from '../State/ModalReducer';
import { setAccessToken, setLogin } from '../State/UserReducer';
import axios, { AxiosResponse } from 'axios';
import { ModalSendOTPEmail, Copyright } from '../Components';

const theme = createTheme();

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const [rememberMe, setRememberMe] = React.useState<Boolean>(false);

    //Login with App
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (data.get('email') !== '') {
            axios
                .get(`User/token-resetpassword/${data.get('email')}`)
                .then((res: AxiosResponse) => {
                    dispatch(setLogin({ token: '', user: { email: data.get('email') } }));
                    dispatch(
                        setModal({
                            modal: {
                                create: false,
                                update: false,
                                delete: false,
                                sendOTP: true,
                                practice: false,
                                name: "We've send a code to your email",
                            },
                        })
                    );
                    dispatch(setAccessToken({ accessToken: res.data }));
                })
                .catch((error) => console.error(`Cannot get token Verify Email: ${error}`));
        }
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
                    Forgot Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Typography>Please Input your Email</Typography>
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

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Submit
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link href="/" variant="body2">
                                {'Back to Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <ModalSendOTPEmail />
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
