import React from 'react';
import {
    Box,
    Divider,
    Paper,
    Typography,
    Link as MLink,
    Button,
    Modal,
    Tooltip,
} from '@mui/material';
import { Check, HelpOutline } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Copyright, ModalSendOTPEmail } from '../Components';
import OptionsMyAccountComponent from '../Components/OptionsMyAccountComponent';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { setAccessToken, setModal } from '../State';

function AboutMe() {
    const _user = useSelector((state: any) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerifyEmail = () => {
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
        axios
            .get(`User/otp/${_user.email}`)
            .then((res: AxiosResponse) => {
                dispatch(setAccessToken({ accessToken: res.data.accessToken }));
            })
            .catch((error) => console.error(`Cannot get token Verify Email: ${error}`));
    };
    return (
        <Box>
            {/* Basic Information */}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Basic Information
                    </Typography>
                    <MLink sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        Edit
                    </MLink>
                </Box>

                <Box sx={{ mt: '1.4rem', display: 'flex' }}>
                    <Box>
                        <Typography sx={{ flexGrow: 12 }}>Name: </Typography>
                        {/* <Typography sx={{ flexGrow: 12 }}>Date of Birth: </Typography> */}
                    </Box>
                    <Box sx={{ ml: '6rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>
                            {_user.fullName ? _user.fullName : _user.userName}
                        </Typography>{' '}
                        {/* <Typography sx={{ flexGrow: 12 }}>Date</Typography> */}
                    </Box>
                </Box>
            </>

            <Divider sx={{ m: 2 }} />

            {/* Email Address */}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Email Address
                    </Typography>
                    {_user.emailConfirmed ? (
                        <Box sx={{ ml: '1rem' }}>
                            <Check color="success" />
                            <Tooltip title="Your Email is verified" placement="top-start">
                                <HelpOutline color="primary" sx={{ fontSize: '12px' }} />
                            </Tooltip>
                        </Box>
                    ) : (
                        <>
                            <MLink
                                onClick={() => {
                                    handleVerifyEmail();
                                }}
                                sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}
                            >
                                Verify
                            </MLink>
                        </>
                    )}
                </Box>

                <Box sx={{ mt: '1.4rem', display: 'flex' }}>
                    <Box>
                        <Typography sx={{ flexGrow: 12 }}>Email: </Typography>
                    </Box>
                    <Box sx={{ ml: '9rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>{_user.email}</Typography>{' '}
                    </Box>
                </Box>
                {_user.emailConfirmed ? (
                    ''
                ) : (
                    <Typography variant="body2" sx={{ color: '#888888', mt: '1rem' }}>
                        Your Email is not confirm
                    </Typography>
                )}
            </>

            <Divider sx={{ m: 2 }} />

            {/* Phone Number */}
            {_user.phoneNumber === null ? (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Phone Number
                        </Typography>
                        <MLink sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}>
                            Edit
                        </MLink>
                    </Box>

                    <Box sx={{ mt: '1.4rem', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" sx={{ color: '#888888' }}>
                            You do not have a phone number
                        </Typography>
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ mt: '1rem', width: '16rem' }}
                        >
                            Add Phone Number
                        </Button>
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            Phone Number
                        </Typography>
                        <MLink sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}>
                            Edit
                        </MLink>
                    </Box>

                    <Box sx={{ mt: '1.4rem', display: 'flex' }}>
                        <Box>
                            <Typography sx={{ flexGrow: 12 }}>Phone Number: </Typography>
                        </Box>
                        <Box sx={{ ml: '9rem' }}>
                            <Typography sx={{ flexGrow: 12 }}>{_user.email}</Typography>{' '}
                        </Box>
                    </Box>
                </>
            )}
            <ModalSendOTPEmail />
        </Box>
    );
}

function Security() {
    const _user = useSelector((state: any) => state.user);
    return (
        <Box>
            {/* Password */}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Password
                    </Typography>
                    <MLink sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}>
                        Edit
                    </MLink>
                </Box>

                <Box sx={{ mt: '1.4rem', display: 'flex' }}>
                    <Box>
                        <Typography sx={{ flexGrow: 12 }}>Password: </Typography>
                    </Box>
                    <Box sx={{ ml: '6rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>************</Typography>{' '}
                    </Box>
                </Box>
            </>

            <Divider sx={{ m: 2 }} />
        </Box>
    );
}

export default function AccountPage() {
    const [index, setIndex] = React.useState(0);

    const _aboutMe = () => {
        setIndex(0);
    };

    const _security = () => {
        setIndex(1);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Box>
                    <Typography variant="h3" mt="1rem">
                        Flash-Cards
                    </Typography>
                    <Box mt="1rem">
                        <Link to={'/home/tags'}>Home</Link>
                        {'/FlashCard'}
                    </Box>
                    <Typography mt="1rem">My Account: Abount Me</Typography>
                    <Paper
                        elevation={10}
                        sx={{
                            width: '54rem',
                            height: '80vh',
                            borderRadius: '1rem',
                            my: 1,
                            display: 'flex',
                        }}
                    >
                        <Box sx={{ flexGrow: 1, m: 1, maxWidth: '12rem', minWidth: '12rem' }}>
                            <OptionsMyAccountComponent _aboutMe={_aboutMe} _security={_security} />
                        </Box>

                        <Divider orientation="vertical" />

                        <Box
                            sx={{
                                flexGrow: 9,
                                p: 3,
                                maxWidth: '40rem',
                                minWidth: '40rem',
                                // display: 'flex',
                                flexWrap: 'wrap',
                            }}
                        >
                            {index === 0 ? <AboutMe /> : ''}
                            {index === 1 ? <Security /> : ''}
                        </Box>
                    </Paper>
                </Box>
            </Box>

            <Copyright sx={{ m: '2rem' }} />
        </React.Fragment>
    );
}
