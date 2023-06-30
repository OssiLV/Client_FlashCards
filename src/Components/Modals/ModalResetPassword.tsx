import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State/ModalReducer';
import axios from 'axios';

const ModalResetPassword = () => {
    const dispatch = useDispatch();
    const _modal = useSelector((state: any) => state.rootModalReducer.modal);
    const _user = useSelector((state: any) => state.rootUserReducer.user);

    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
    const [validatePassword, setValidatePassword] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleResetPassword = () => {
        if (!validatePassword) {
            axios
                .post('/User/change-password', {
                    email: _user.email,
                    currentPassword: currentPassword,
                    newPassword: confirmNewPassword,
                })
                .then((res) => {
                    handleClose();
                })
                .catch((error) => {
                    setError(error.response.data);
                });
        }
    };

    const handleValidate = (value: string) => {
        if (newPassword === value) {
            setValidatePassword(false);
            setConfirmNewPassword(value);
        } else {
            setValidatePassword(true);
        }
    };

    const handleClose = () => {
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    resetPassword: false,
                    practice: false,
                    name: '',
                },
            })
        );
    };

    return (
        <Modal
            keepMounted
            open={_modal.resetPassword}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    borderRadius: 5,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography
                    id="keep-mounted-modal-title"
                    variant="h6"
                    component="h2"
                    align="center"
                    color="primary"
                >
                    {_modal.name}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setCurrentPassword(event.target.value)
                        }
                        fullWidth
                        type="password"
                        label="current password"
                        variant="standard"
                        size="small"
                    />

                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setNewPassword(event.target.value)
                        }
                        error={validatePassword}
                        fullWidth
                        type="password"
                        sx={{ mt: 1 }}
                        label="new password"
                        variant="standard"
                        size="small"
                    />
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            handleValidate(event.target.value);
                        }}
                        error={validatePassword}
                        fullWidth
                        type="password"
                        label="confirm new password"
                        variant="standard"
                        size="small"
                    />
                </Box>
                <Typography color="error" variant="caption">
                    {error ? error : ''}
                </Typography>
                <Box sx={{ mt: 1, ml: 12 }}>
                    <Button onClick={handleResetPassword} color="primary">
                        Reset
                    </Button>
                    <Button onClick={handleClose} color="error" variant="contained">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalResetPassword;
