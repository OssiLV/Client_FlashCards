import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State/ModalReducer';
import {
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { toast } from 'react-hot-toast';
import axios, { AxiosResponse } from 'axios';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 6,
    boxShadow: 24,
    p: 4,
};

interface ITag {
    id: number;
    name: string;
    description: string;
}

export default function ModalCreate({ forceRender }: any) {
    const dispatch = useDispatch();
    const _modal = useSelector((state: any) => state.rootModalReducer.modal);
    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const _tagId = useSelector((state: any) => state.rootCurrentValueReducer.tagId);

    const maxlength: number = 12;
    const [value_1, setValue_1] = React.useState('');
    const [value_2, setValue_2] = React.useState('');
    const [errValidate_1, setErrValidate_1] = React.useState(false);
    const [errValidate_2, setErrValidate_2] = React.useState(false);

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

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);

        if (_modal.name === 'Create Tag' && !errValidate_1 && !errValidate_2) {
            console.log(1);

            axios
                .post(`Tag/addtag`, {
                    name: value_1,
                    description: value_2,
                    userId: _user.id,
                })
                .then((res: AxiosResponse) => {
                    toast.success('Created a Tag success');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot Create Tag: ${error}`));
        }

        if (_modal.name === 'Create Card') {
            axios
                .post(`Card/addcard`, {
                    title: value_1,
                    translate: value_2,
                    tagId: _tagId,
                })
                .then((res) => {
                    toast.success('Created a Card success');
                    handleClose();
                    forceRender();
                })
                .catch((error) => console.error(`Cannot Create Card: ${error}`));
        }
    };

    return (
        <div>
            <Modal
                keepMounted
                open={_modal?.create}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style} component="form" onSubmit={handleCreate}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        {_modal?.name}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {/* Input */}
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setValue_1(event.target.value)
                        }
                        required
                        fullWidth
                        label={_modal?.name === 'Create Tag' ? 'name' : 'title'}
                        error={errValidate_1}
                        helperText={errValidate_1 ? 'Value must be less than 12 characters' : ''}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />
                    <TextField
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setValue_2(event.target.value)
                        }
                        required
                        fullWidth
                        label={_modal?.name === 'Create Tag' ? 'description' : 'translate'}
                        error={errValidate_2}
                        helperText={errValidate_2 ? 'Value must be less than 12 characters' : ''}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />

                    {/* Button */}
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
                            Create
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
