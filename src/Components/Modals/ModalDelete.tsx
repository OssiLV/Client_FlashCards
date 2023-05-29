import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios, { AxiosResponse } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';
import { Divider } from '@mui/material';
import { toast } from 'react-hot-toast';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface ITag {
    id: number;
    name: string;
    description: string;
}

export default function ModalDelete({ forceRender }: any) {
    const dispatch = useDispatch();
    const _user = useSelector((state: any) => state.user);
    const _modal = useSelector((state: any) => state.modal);
    const tagId = useSelector((state: any) => state.tagId);
    const cardId = useSelector((state: any) => state.cardId);
    const [_totalPage, _setTotalPage] = React.useState<number>(1);

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

    const getPage = React.useCallback(() => {
        axios
            .get(`Tag/total-page-tag/${_user.id}`)
            .then((res: AxiosResponse) => {
                _setTotalPage(res.data);
            })
            .catch();
    }, []);

    const handleDelete = () => {
        if (_modal.name === 'Delete Tag') {
            axios
                .delete(`Tag/delete/${tagId}`)
                .then(() => {
                    toast.error('Your Tag is deleted');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot delete Tag: ${error}`));
        }

        if (_modal.name === 'Delete Card') {
            axios
                .delete(`Card/delete/${cardId}`)
                .then(() => {
                    toast.error('Your Card is deleted');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot delete Card: ${error}`));
        }
    };

    return (
        <div>
            <Modal
                keepMounted
                open={_modal?.delete}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {_modal?.name}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Box sx={{ ml: 18, mt: 1 }}>
                        <Button
                            onClick={handleClose}
                            variant="outlined"
                            size="small"
                            sx={{ mr: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
