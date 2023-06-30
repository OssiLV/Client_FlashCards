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

import { setLogin, setLogout } from '../State/UserReducer';
import axios, { AxiosResponse } from 'axios';
import { Copyright } from '../Components';
//

const theme = createTheme();

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const _accessToken = useSelector((state: any) => state.rootUserReducer.accessToken);
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const [err, setErr] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const password = String(data.get('password1'));
        const confirmPassword = String(data.get('password2'));

        if (password === confirmPassword) {
            axios
                .post('User/resetpassword', {
                    email: _user.email,
                    password: data.get('password2'),
                    accessToken: _accessToken,
                })
                .then(() => {
                    dispatch(setLogout());
                    navigate('/');
                })
                .catch((error) => console.error(`Cannot SignUp ${error}`));
        }
    };

    React.useEffect(() => {
        if (password === confirmPassword) {
            setErr(false);
        } else {
            setErr(true);
        }
    }, [confirmPassword]);

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
                    Reset Password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Divider sx={{ my: 1 }} />

                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(event.target.value)
                        }
                        error={err}
                        helperText={err ? 'Password does not match!' : ''}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password1"
                        label="Password"
                        name="password1"
                        autoFocus
                    />
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setConfirmPassword(event.target.value)
                        }
                        error={err}
                        helperText={err ? 'Password does not match!' : ''}
                        value={confirmPassword}
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        id="password2"
                        label="Password Confirm"
                        name="password2"
                        autoFocus
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Reset
                    </Button>

                    <Grid container>
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                {'Back to Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
