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
import { toast } from 'react-hot-toast';

export default function SignUp() {
    const navigate = useNavigate();
    const [errPassword, setErrPassword] = React.useState(true);
    const [errUserName, setErrUserName] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const password = String(data.get('password'));
        const confirmPassword = data.get('confirmPassword');

        if (!errPassword && !errUserName) {
            axios
                .post('User/signup', {
                    userName: data.get('userName'),
                    email: data.get('email'),
                    password: data.get('password'),
                    emailConfirm: false,
                })
                .then(() => navigate('/home/tags'))
                .catch((error) => {
                    console.error(`Cannot SignUp ${error}`);

                    setErrUserName(true);
                });
        }

        if (errPassword || errUserName) {
            toast.error('Cannot SignUp');
        }
    };

    React.useEffect(() => {
        if (password === confirmPassword) {
            setErrPassword(false);
        } else {
            setErrPassword(true);
        }
    }, [confirmPassword]);

    React.useEffect(() => {
        const maxLength: number = 12;
        const specialCharacters = [
            '!',
            '@',
            '#',
            '$',
            '?',
            '+',
            '-',
            '*',
            '/',
            '"',
            "'",
            '&',
            '%',
            '^',
            '`',
            '~',
            '=',
            '[',
            ']',
            '{',
            '}',
        ];
        let isSpecialCharacters = false;
        for (const specialCharacter of specialCharacters) {
            if (userName.includes(specialCharacter)) {
                isSpecialCharacters = true;
            }
        }

        // if (userName.trim() === '') {
        //     setErrUserName(true);
        // }
        if (userName.length > maxLength) {
            setErrUserName(true);
        }
        if (userName.trim() !== '' && userName.length <= maxLength && !isSpecialCharacters) {
            setErrUserName(false);
        }
    }, [userName]);

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
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    setUserName(event.target.value)
                                }
                                error={errUserName}
                                helperText={
                                    errUserName
                                        ? 'UserName must be < 12 and does not contain specialCharacters and space'
                                        : ''
                                }
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
                                error={errPassword}
                                helperText={errPassword ? 'Password does not match!' : ''}
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
                                error={errPassword}
                                helperText={errPassword ? 'Password does not match!' : ''}
                                value={confirmPassword}
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                            />
                        </Grid>
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
