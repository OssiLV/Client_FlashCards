import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';
import axios from 'axios';
import { Divider, TextField } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

interface ITag {
    id: number;
    name: string;
    description: string;
}

export default function ModalUpdate({ userId, _tagId, page, func }: any) {
    const dispatch = useDispatch();

    const _modal = useSelector((state: any) => state.modal);
    const tagId = useSelector((state: any) => state.tagId);

    const handleClose = () =>
        dispatch(setModal({ modal: { create: false, update: false, delete: false, name: '' } }));

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if (_modal.name === 'Update Tag') {
            axios
                .put('Tag/edit', {
                    id: tagId,
                    name: data.get('name'),
                    description: data.get('description'),
                })
                .then(() => {
                    handleClose();
                    updateTagRender();
                })
                .catch((error) => console.error(`Cannot update: ${error}`));
        }
    };

    const updateTagRender = React.useCallback(() => {
        axios
            .get(`Tag/${userId}/${page}`)
            .then((res) => {
                func(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [page]);

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                keepMounted
                open={_modal?.update}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} component="form" onSubmit={handleUpdate}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {_modal?.name}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <TextField
                        required
                        fullWidth
                        name={_modal?.name === 'Update Tag' ? 'name' : 'title'}
                        label={_modal?.name === 'Update Tag' ? 'name' : 'title'}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />

                    <TextField
                        required
                        fullWidth
                        name={_modal?.name === 'Update Tag' ? 'description' : 'translate'}
                        label={_modal?.name === 'Update Tag' ? 'description' : 'translate'}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />
                    <Box sx={{ ml: 18, mt: 1 }}>
                        <Button
                            onClick={handleClose}
                            variant="contained"
                            color="error"
                            size="small"
                            sx={{ mr: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outlined" type="submit">
                            Update
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
