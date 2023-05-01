import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../State';
import {
    Divider,
    FormControl,
    InputLabel,
    Link,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import axios from 'axios';

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

export default function ModalCreate({ tags, page, func }: any) {
    const dispatch = useDispatch();
    const [tagId, setTagId] = React.useState<string>('');

    const _modal = useSelector((state: any) => state.modal);
    const user = useSelector((state: any) => state.user);

    const handleClose = () =>
        dispatch(setModal({ modal: { create: false, update: false, delete: false, name: '' } }));

    const handleSelectTag = (event: SelectChangeEvent) => {
        setTagId(event.target.value);
    };

    const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (_modal.name === 'Create Tag') {
            axios
                .post(`Tag/addtag`, {
                    name: data.get('name'),
                    description: data.get('description'),
                    userId: user.id,
                })
                .then((res) => {
                    handleClose();
                    func();
                    // window.location.reload();
                })
                .catch((error) => console.error(`Cannot Create Tag: ${error}`));
        }

        if (_modal.name === 'Create Card') {
            axios
                .post(`Card/addcard`, {
                    title: data.get('title'),
                    translate: data.get('translate'),
                    tagId: tagId,
                })
                .then((res) => {
                    handleClose();
                    window.location.reload();
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
                        required
                        fullWidth
                        name={_modal?.name === 'Create Tag' ? 'name' : 'title'}
                        label={_modal?.name === 'Create Tag' ? 'name' : 'title'}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />
                    <TextField
                        required
                        fullWidth
                        name={_modal?.name === 'Create Tag' ? 'description' : 'translate'}
                        label={_modal?.name === 'Create Tag' ? 'description' : 'translate'}
                        size="small"
                        type="text"
                        sx={{ my: 1 }}
                    />
                    {_modal?.name === 'Create Card' && (
                        <FormControl variant="standard" sx={{ width: 200 }}>
                            {/* <Typography sx={{ flexGrow: 1 }}></Typography> */}
                            <InputLabel sx={{ display: 'flex' }}>
                                Select Tag in page <Link sx={{ ml: 1 }}>{page}</Link>
                            </InputLabel>

                            <Select sx={{ flexGrow: 2 }} value={tagId} onChange={handleSelectTag}>
                                {tags.map((tag: ITag) => (
                                    <MenuItem key={tag?.id} value={tag?.id}>
                                        {tag?.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

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
