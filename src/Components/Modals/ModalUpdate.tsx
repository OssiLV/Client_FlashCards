import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';
import axios from 'axios';
import { Divider, TextField } from '@mui/material';
import { toast } from 'react-hot-toast';

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

export default function ModalUpdate({ forceRender }: any) {
    const dispatch = useDispatch();

    const _modal = useSelector((state: any) => state.modal);
    const tagId = useSelector((state: any) => state.tagId);
    const cardId = useSelector((state: any) => state.cardId);

    const maxlength: number = 12;
    const [value_1, setValue_1] = React.useState('');
    const [value_2, setValue_2] = React.useState('');
    const [errValidate_1, setErrValidate_1] = React.useState(false);
    const [errValidate_2, setErrValidate_2] = React.useState(false);

    //Validate
    React.useEffect(() => {
        if (value_1.length <= maxlength) {
            setErrValidate_1(false);
        } else {
            setErrValidate_1(true);
        }

        if (value_2.length <= maxlength) {
            setErrValidate_2(false);
        } else {
            setErrValidate_2(true);
        }
    }, [value_1, value_2]);

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

    const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (_modal.name === 'Update Tag') {
            axios
                .put('Tag/update', {
                    id: tagId,
                    name: value_1,
                    description: value_2,
                })
                .then(() => {
                    toast.success('Updated Tag');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot update Tag: ${error}`));
        }

        if (_modal.name === 'Update Card') {
            axios
                .put('Card/update', {
                    id: cardId,
                    title: value_1,
                    translate: value_2,
                })
                .then(() => {
                    toast.success('Updated Card');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot update Card: ${error}`));
        }
    };

    return (
        <div>
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
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setValue_1(event.target.value)
                        }
                        error={errValidate_1}
                        helperText={errValidate_1 ? 'Value must be < 12 ' : ''}
                        required
                        fullWidth
                        label={_modal?.name === 'Update Tag' ? 'name' : 'title'}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />

                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setValue_2(event.target.value)
                        }
                        error={errValidate_2}
                        helperText={errValidate_2 ? 'Value must be < 12 ' : ''}
                        required
                        fullWidth
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
