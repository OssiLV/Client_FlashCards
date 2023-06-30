import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAccessToken, setIsEmailCofirm } from '../../State/UserReducer';
import { Box, Typography } from '@mui/material';

export default function OTPResetPasswordPage() {
    const _accessToken = useSelector((state: any) => state.rootUserReducer.accessToken);
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState<string>('');
    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    const handleComplete = (otp: string) => {
        axios
            .post(`User/verifyemail`, {
                email: _user.email,
                accessToken: _accessToken,
                otp: otp,
            })
            .then((res: AxiosResponse) => {
                dispatch(setIsEmailCofirm({ emailConfirmed: res.data }));
                dispatch(setAccessToken({ accessToken: '' }));
                window.location.assign('http://localhost:3000/account');
            })
            .catch((error) => console.error(error));
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box sx={{ mb: 3 }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                    INPUT OTP TO RESET YOUR PASSWORD
                </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
                <MuiOtpInput
                    sx={{
                        display: 'flex',
                        gap: '30px',
                        maxWidth: '650px',
                        marginInline: 'auto',
                    }}
                    value={value}
                    onChange={handleChange}
                    onComplete={handleComplete}
                    length={4}
                    validateChar={(character: string, index: number) => true}
                />
            </Box>
        </Box>
    );
}
