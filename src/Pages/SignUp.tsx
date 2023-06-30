import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Container,
    Typography,
} from '@mui/material';
import { LockClockOutlined } from '@mui/icons-material';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SignUp() {
    const navigate = useNavigate();
    const [errPassword, setErrPassword] = React.useState(true);
    const [errUserName, setErrUserName] = React.useState(false);
    const [errUserEmail, setErrUserEmail] = React.useState(false);
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');

        if (!errPassword && !errUserName) {
            axios
                .post('User/signup', {
                    userName: data.get('userName'),
                    email: data.get('email'),
                    password: data.get('password'),
                    emailConfirm: false,
                })
                .then((res) => {
                    navigate('/');
                })
                .catch((error) => {
                    setMessage(error.response.data);
                    if (error.response.data === 'User Email already exists') {
                        setErrUserEmail(true);
                    }
                    toast.error('Cannot Register');
                    console.error(`Cannot Register ${error}`);
                });
        }

        if (errPassword || errUserName) {
            toast.error('Cannot Register');
        }
    };

    React.useEffect(() => {
        if (password === confirmPassword) {
            setErrPassword(false);
        } else {
            setErrPassword(true);
        }
    }, [confirmPassword]);

    React.useEffect(() => {}, [userName]);

    const handleCheckUserName = (value: string) => {
        setUserName(value);
        const maxLength: number = 12;
        const specialCharacters = [
            '.',
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
                setErrUserName(true);
            }
        }

        if (userName.trim() === '') {
            setErrUserName(true);
        }
        if (userName.length > maxLength) {
            setErrUserName(true);
        }
        if (userName.trim() !== '' && userName.length <= maxLength && !isSpecialCharacters) {
            setErrUserName(false);
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
                                    handleCheckUserName(event.target.value)
                                }
                                error={errUserName}
                                helperText={
                                    errUserName
                                        ? 'UserName must be less than 12 characters and does not contain special Characters and space'
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
                                error={errUserEmail}
                                helperText={errUserEmail ? 'User Email already exist!!' : ''}
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
                        {message !== '' ? (
                            <Box sx={{ mt: '1rem', ml: 2, color: '#d32f2f' }}>
                                <Typography sx={{}}>{message}</Typography>
                            </Box>
                        ) : (
                            ''
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
