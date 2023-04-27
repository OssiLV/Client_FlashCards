import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Container,
    Typography,
} from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const navigate = useNavigate();
    const [err, setErr] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get('password'));
        const confirmPassword = data.get('confirmPassword');

        if (password === confirmPassword) {
            axios
                .post('User/signup', {
                    userName: data.get('userName'),
                    email: data.get('email'),
                    password: data.get('password'),
                    emailConfirm: false,
                })
                .then(() => navigate('/home/tags'))
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

    // const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setPassword(event.target.value);
    // };
    // const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setConfirmPassword(event.target.value);
    //     if (password === confirmPassword) {
    //         console.log(1);
    //     }
    // };

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
                    <LockClockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                name="userName"
                                type="text"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(event.target.value)
                                }
                                required
                                fullWidth
                                error={err}
                                helperText={err ? 'Password does not match!' : ''}
                                value={password}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setConfirmPassword(event.target.value)
                                }
                                required
                                fullWidth
                                error={err}
                                helperText={err ? 'Password does not match!' : ''}
                                value={confirmPassword}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
