import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';

export default function ModalSendOTPEmail() {
    const dispatch = useDispatch();
    const _modal = useSelector((state: any) => state.modal);
    const user = useSelector((state: any) => state.user);

    const handleClose = () =>
        dispatch(
            setModal({
                modal: {
                    create: false,
                    update: false,
                    delete: false,
                    sendOTP: false,
                    practice: false,
                    name: '',
                },
            })
        );

    return (
        <Modal
            keepMounted
            open={_modal.sendOTP}
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
                    borderRadius: '2rem',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    {"We've send a code to your email"}
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                    Please check your Mail
                </Typography>
            </Box>
        </Modal>
    );
}
