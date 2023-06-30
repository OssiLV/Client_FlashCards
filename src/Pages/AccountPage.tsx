import React from 'react';
import {
    Box,
    Divider,
    Paper,
    Typography,
    Link as MLink,
    Button,
    Tooltip,
    TextField,
} from '@mui/material';
import { Check, HelpOutline } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Copyright, ModalResetPassword, ModalSendOTPEmail } from '../Components';
import OptionsMyAccountComponent from '../Components/OptionsMyAccountComponent';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { setAccessToken, setLogout, setUserName } from '../State/UserReducer';
import { setModal } from '../State/ModalReducer';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';
import { MobileAccountComponent } from '../Components';

function AboutMe() {
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [changeUserName, setChangeUserName] = React.useState(false);
    const [nameValue, setNameValue] = React.useState(
        _user?.fullName ? _user?.fullName : _user?.userName
    );
    const [validateName, setValidateName] = React.useState(false);

    const handleChangeUserName = () => {
        if (nameValue !== '') {
            axios
                .post('/User/change-user-name', {
                    email: _user.email,
                    newUserName: nameValue,
                })
                .then(() => {
                    dispatch(setUserName(nameValue));
                    setValidateName(false);
                    setChangeUserName(false);
                });
        } else {
            setValidateName(true);
        }
    };

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
                    <MLink
                        onClick={() => setChangeUserName(true)}
                        sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}
                    >
                        Edit
                    </MLink>
                </Box>

                <Box sx={{ mt: '1.4rem', display: 'flex' }}>
                    <Box>
                        <Typography sx={{ flexGrow: 12 }}>Name: </Typography>
                    </Box>
                    <Box sx={{ ml: '6rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>
                            {changeUserName ? (
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            setNameValue(event.target.value)
                                        }
                                        variant="outlined"
                                        size="small"
                                        error={validateName}
                                        value={nameValue}
                                    ></TextField>

                                    <Box sx={{ ml: 1 }}>
                                        <Button
                                            onClick={() => {
                                                setChangeUserName(false);
                                                setValidateName(false);
                                            }}
                                            size="small"
                                            color="error"
                                            variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleChangeUserName}
                                            size="small"
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                            ) : _user?.fullName ? (
                                _user?.fullName
                            ) : (
                                _user?.userName
                            )}
                        </Typography>
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
                    <Box sx={{ ml: '6rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>{_user.email}</Typography>{' '}
                    </Box>
                </Box>
                {_user.emailConfirmed ? (
                    ''
                ) : (
                    <>
                        <Typography variant="body2" sx={{ color: '#888888', mt: '1rem' }}>
                            Your Email is not confirm
                        </Typography>
                    </>
                )}
            </>

            <ModalSendOTPEmail />
        </Box>
    );
}

function Security() {
    const dispatch = useDispatch();
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const _modal = useSelector((state: any) => state.rootModalReducer.modal);
    const hanldeShowModalResetPassword = () => {
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    resetPassword: true,
                    practice: false,
                    name: 'Reset Password',
                },
            })
        );
    };

    return (
        <>
            <ModalResetPassword />
            {/* Password */}
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Password
                </Typography>
                <MLink
                    onClick={hanldeShowModalResetPassword}
                    sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}
                >
                    Change Password
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

            <Divider sx={{ m: 2 }} />
        </>
    );
}

function AccountMobileAndTablet() {
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [changeUserName, setChangeUserName] = React.useState(false);
    const [nameValue, setNameValue] = React.useState(
        _user?.fullName ? _user?.fullName : _user?.userName
    );
    const [validateName, setValidateName] = React.useState(false);

    const handleChangeUserName = () => {
        if (nameValue !== '') {
            axios
                .post('/User/change-user-name', {
                    email: _user.email,
                    newUserName: nameValue,
                })
                .then(() => {
                    dispatch(setUserName(nameValue));
                    setValidateName(false);
                    setChangeUserName(false);
                });
        } else {
            setValidateName(true);
        }
    };

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

    const hanldeShowModalResetPassword = () => {
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    resetPassword: true,
                    practice: false,
                    name: 'Reset Password',
                },
            })
        );
    };
    return (
        <>
            <ModalResetPassword />
            {/* Basic Information */}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Basic Information
                    </Typography>
                    <MLink
                        onClick={() => setChangeUserName(true)}
                        sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}
                    >
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
                            {changeUserName ? (
                                <Box sx={{ display: 'flex' }}>
                                    <TextField
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            setNameValue(event.target.value)
                                        }
                                        variant="outlined"
                                        size="small"
                                        value={nameValue}
                                        error={validateName}
                                    ></TextField>

                                    <Box sx={{ ml: 1 }}>
                                        <Button
                                            onClick={() => {
                                                setChangeUserName(false);
                                                setValidateName(false);
                                            }}
                                            size="small"
                                            color="error"
                                            variant="contained"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleChangeUserName}
                                            size="small"
                                            color="primary"
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                            ) : _user?.fullName ? (
                                _user?.fullName
                            ) : (
                                _user?.userName
                            )}
                        </Typography>
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
                    <Box sx={{ ml: '6rem' }}>
                        <Typography sx={{ flexGrow: 12 }}>{_user.email}</Typography>{' '}
                    </Box>
                </Box>
                {_user.emailConfirmed ? (
                    ''
                ) : (
                    <>
                        <Typography variant="body2" sx={{ color: '#888888', mt: '1rem' }}>
                            Your Email is not confirm
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#d32f2f', mt: '1rem' }}>
                            Email will be DELETE when you Logout!
                        </Typography>
                    </>
                )}
            </>

            <Divider sx={{ m: 2 }} />

            {/* Password */}
            <>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        Password
                    </Typography>
                    <MLink
                        onClick={hanldeShowModalResetPassword}
                        sx={{ ml: '1rem', mt: '6px', fontSize: '14px', cursor: 'pointer' }}
                    >
                        Change Password
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

            <ModalSendOTPEmail />
        </>
    );
}

export default function AccountPage() {
    const _user: any = useSelector((state: any) => state.rootUserReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isTablet = useMediaQuery('(max-width: 900px)');
    const isMobile = useMediaQuery('(max-width: 666px)');
    const [index, setIndex] = React.useState(0);

    const _aboutMe = () => {
        setIndex(0);
    };

    const _security = () => {
        setIndex(1);
    };

    const handleLogOutForTabletAndMobile = () => {
        if (!_user.emailConfirmed) {
            // axios.delete(`User/delete/${_user.email}`).then(() => {
            // });
            dispatch(setLogout());
            navigate('/');
        } else {
            dispatch(setLogout());
            navigate('/');
        }
    };

    const handleNavigatePreviousPageForTabletAndMobile = () => {
        window.history.back();
    };

    return (
        <React.Fragment>
            {isMobile ? (
                <>
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
                            <Box sx={{}}>
                                <Paper
                                    sx={{
                                        width: '365px',
                                        height: '80vh',
                                        borderRadius: '1rem',
                                        my: 1,
                                        p: 3,
                                    }}
                                >
                                    <AccountMobileAndTablet />
                                    <Box
                                        sx={{
                                            mt: 4,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            onClick={() => handleLogOutForTabletAndMobile()}
                                            color="error"
                                            variant="contained"
                                        >
                                            Log Out
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                handleNavigatePreviousPageForTabletAndMobile()
                                            }
                                            color="primary"
                                            variant="text"
                                        >
                                            Back
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>
                    <Copyright sx={{ m: '1rem' }} />
                </>
            ) : isTablet ? (
                <>
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
                            <Box sx={{}}>
                                <Paper
                                    sx={{
                                        width: '40rem',
                                        height: '80vh',
                                        borderRadius: '1rem',
                                        my: 1,
                                        p: 3,
                                    }}
                                >
                                    <AccountMobileAndTablet />
                                    <Box
                                        sx={{
                                            mt: 4,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Button
                                            onClick={() => handleLogOutForTabletAndMobile()}
                                            color="error"
                                            variant="contained"
                                        >
                                            Log Out
                                        </Button>

                                        <Button
                                            onClick={() =>
                                                handleNavigatePreviousPageForTabletAndMobile()
                                            }
                                            color="primary"
                                            variant="text"
                                        >
                                            Back
                                        </Button>
                                    </Box>
                                </Paper>
                            </Box>
                        </Box>
                    </Box>

                    <Copyright sx={{ m: '1rem' }} />
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100vh',
                        }}
                    >
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
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    m: 1,
                                    maxWidth: '12rem',
                                    minWidth: '12rem',
                                }}
                            >
                                <OptionsMyAccountComponent
                                    _aboutMe={_aboutMe}
                                    _security={_security}
                                />
                            </Box>

                            <Divider orientation="vertical" />

                            <Box
                                sx={{
                                    flexGrow: 9,
                                    p: 3,
                                    maxWidth: '40rem',
                                    minWidth: '40rem',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {index === 0 ? <AboutMe /> : ''}
                                {index === 1 ? <Security /> : ''}
                            </Box>
                        </Paper>
                    </Box>

                    <Copyright sx={{ mb: 1 }} />
                </>
            )}
        </React.Fragment>
    );
}
