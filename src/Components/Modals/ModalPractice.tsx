import {
    Modal,
    Button,
    Typography,
    Box,
    SelectChangeEvent,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    MenuItem,
    ListItemText,
    OutlinedInput,
} from '@mui/material';
import axios from 'axios';
import { AxiosResponse } from 'axios';

import React from 'react';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface ITag {
    id: number;
    name: string;
    description: string;
}

function ModalPractice() {
    const _user = useSelector((state: any) => state.user);
    const [tags, setTags] = React.useState([]);

    React.useEffect(() => {
        axios
            .get(`Tag/alltags/${_user.id}`)
            .then((res: AxiosResponse) => {
                console.log(res.data);
                setTags(res.data);
            })
            .catch((error) => console.error(error));
    }, []);

    const [choosedTag, setChoosedTag] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: SelectChangeEvent<typeof choosedTag>) => {
        setChoosedTag(event.target.value);
    };

    console.log(choosedTag);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100vh',
                }}
            >
                <Button onClick={handleOpen} variant="contained">
                    Please Chooses Tag you want to Practice
                </Button>
            </Box>
            <Modal
                keepMounted
                open={open}
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
                        borderRadius: 6,
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                        Choose Tag
                    </Typography>
                    <div>
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                value={choosedTag}
                                onChange={handleChange}
                                input={<OutlinedInput label="Tag" />}
                                // MenuProps={MenuProps}
                            >
                                {tags.map((tag: ITag) => (
                                    <MenuItem key={tag.id} value={tag.name}>
                                        <ListItemText primary={tag.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <Box sx={{ ml: '12rem', my: 1 }}>
                        <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button>Next</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalPractice;
