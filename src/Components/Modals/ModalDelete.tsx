import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';
import { Divider } from '@mui/material';

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

export default function ModalDelete({ userId, page, func }: any) {
    const dispatch = useDispatch();

    const _modal = useSelector((state: any) => state.modal);
    const tagId = useSelector((state: any) => state.tagId);
    // const [tags, setTags] = React.useState<Array<ITag>>([]);

    const handleClose = () =>
        dispatch(setModal({ modal: { create: false, update: false, delete: false, name: '' } }));

    const handleDelete = () => {
        if (_modal.name === 'Delete Tag') {
            axios
                .delete(`Tag/delete/${tagId}`)
                .then(() => {
                    handleClose();
                    deleteTagRender();
                    // window.location.reload();
                })
                .catch((error) => console.error(`Cannot delete tag: ${error}`));
        }
    };

    const deleteTagRender = React.useCallback(() => {
        axios
            .get(`Tag/${userId}/${page}`)
            .then((res) => {
                func(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

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
