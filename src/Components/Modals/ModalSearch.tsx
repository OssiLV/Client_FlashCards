import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Typography, Box, Divider, TextField, Chip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import axios from 'axios';
import { AxiosResponse } from 'axios';
import { setModal } from '../../State/ModalReducer';
import { useNavigate } from 'react-router-dom';
import { setTagId } from '../../State/CurrentValueReducer';

interface ITag {
    id: number;
    name: string;
    description: string;
}

const ModalSearch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const _user = useSelector((state: any) => state.rootUserReducer.user);
    const _modal = useSelector((state: any) => state.rootModalReducer.modal);

    const [tags, setTags] = React.useState<Array<ITag>>([]);
    const [filteredResults, setFilteredResults] = React.useState<Array<ITag>>([]);
    const [searchTag, setSearchTag] = React.useState('');

    const handleCloseModal = () => {
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
    };

    React.useEffect(() => {
        axios
            .get(`Tag/alltags/${_user?.id}`)
            .then((res: AxiosResponse) => {
                setTags(res.data);
            })
            .catch((error) => console.error(error));
    }, [_user?.id]);

    // Handle Click Tag
    const handleClickTag = (tagId: number, tagName: string) => {
        dispatch(setTagId({ tagId: tagId }));
        navigate(`/home/cards/${tagName}`);
        handleCloseModal();
    };

    const handleSearch = (value: string) => {
        if (value !== '') {
            const filteredTag = tags.filter((x) => {
                return `${x.name.toLowerCase()} ${x.description.toLowerCase()}`.includes(
                    value.toLowerCase()
                );
            });

            setFilteredResults(filteredTag);
        } else {
            setFilteredResults(tags);
        }
    };

    return (
        <div>
            <Modal
                keepMounted
                open={_modal.practice}
                onClose={() => {
                    handleCloseModal();
                    setSearchTag('');
                }}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 700,
                        height: 604.8,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                    }}
                >
                    {/* HEADER */}
                    <Box component="header" sx={{ height: 72.8, p: '8px' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <SearchIcon color="primary" fontSize="large" />
                            <TextField
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    handleSearch(event.target.value);
                                    setSearchTag(event.target.value);
                                }}
                                sx={{ border: 'none', height: '56px' }}
                                variant="standard"
                                fullWidth
                                placeholder="Search..."
                                value={searchTag}
                            />
                        </Box>
                    </Box>

                    <Divider />
                    {/* BODY */}
                    <Box component="div" sx={{ height: 488, px: '12px' }}>
                        <Box sx={{ minHeight: '384px', maxHeight: '460px', overflowY: 'scroll' }}>
                            <Box component="section" sx={{ lineHeight: 1.5 }}>
                                <Box
                                    sx={{
                                        pt: '8px',
                                        fontSize: '0.8125rem',
                                        fontWeight: '500',
                                        color: 'rgb(62, 80, 96)',
                                    }}
                                >
                                    Tags
                                </Box>
                                <Box component="ul" sx={{ padding: 0 }}>
                                    {searchTag.length > 1
                                        ? filteredResults.map((tag: ITag) => {
                                              return (
                                                  <div key={tag.id}>
                                                      <Box
                                                          component="li"
                                                          onClick={() =>
                                                              handleClickTag(tag.id, tag.name)
                                                          }
                                                          sx={{
                                                              display: 'flex',
                                                              alignItems: 'center',
                                                              justifyContent: 'space-between',
                                                              height: '60px',
                                                              px: '8px',
                                                              ':hover': {
                                                                  backgroundColor:
                                                                      'rgb(252, 228, 236)',
                                                                  border: '1px solid rgb(233, 30, 99)',
                                                                  cursor: 'pointer',
                                                                  borderRadius: '10px',
                                                                  color: 'rgb(233, 30, 99)',
                                                              },
                                                          }}
                                                      >
                                                          <TurnedInIcon />
                                                          <Box
                                                              sx={{
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  flexShrink: 0,
                                                                  width: '440px',
                                                              }}
                                                          >
                                                              <Typography
                                                                  sx={{
                                                                      fontWeight: '600',
                                                                      fontSize: '18px',
                                                                  }}
                                                              >
                                                                  {tag.name}
                                                              </Typography>
                                                              <Typography
                                                                  variant="caption"
                                                                  sx={{ color: '#3E5060' }}
                                                              >
                                                                  {tag.description}
                                                              </Typography>
                                                          </Box>
                                                          <Chip label="FlashCards" />
                                                      </Box>
                                                      <Divider />
                                                  </div>
                                              );
                                          })
                                        : tags.map((tag: ITag) => {
                                              return (
                                                  <div key={tag.id}>
                                                      <Box
                                                          component="li"
                                                          //   key={tag.id}
                                                          onClick={() =>
                                                              handleClickTag(tag.id, tag.name)
                                                          }
                                                          sx={{
                                                              display: 'flex',
                                                              alignItems: 'center',
                                                              justifyContent: 'space-between',
                                                              height: '60px',
                                                              px: '8px',
                                                              ':hover': {
                                                                  backgroundColor:
                                                                      'rgb(252, 228, 236)',
                                                                  border: '1px solid rgb(233, 30, 99)',
                                                                  cursor: 'pointer',
                                                                  borderRadius: '10px',
                                                                  color: 'rgb(233, 30, 99)',
                                                              },
                                                          }}
                                                      >
                                                          <TurnedInIcon />
                                                          <Box
                                                              sx={{
                                                                  display: 'flex',
                                                                  flexDirection: 'column',
                                                                  flexShrink: 0,
                                                                  width: '440px',
                                                              }}
                                                          >
                                                              <Typography
                                                                  sx={{
                                                                      fontWeight: '600',
                                                                      fontSize: '18px',
                                                                  }}
                                                              >
                                                                  {tag.name}
                                                              </Typography>
                                                              <Typography
                                                                  variant="caption"
                                                                  sx={{ color: '#3E5060' }}
                                                              >
                                                                  {tag.description}
                                                              </Typography>
                                                          </Box>
                                                          <Chip label="FlashCards" />
                                                      </Box>
                                                      <Divider />
                                                  </div>
                                              );
                                          })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Divider />

                    {/* FOOTER */}
                    <Box
                        component="footer"
                        sx={{
                            height: 44,
                            px: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            position: 'absolute',
                            right: 0,
                        }}
                    >
                        <Typography sx={{ color: '#6F7E8C', fontSize: '12px' }}>
                            Search by User
                        </Typography>
                    </Box>
                </Box>
            </Modal>

            {/*  */}
        </div>
    );
};

export default ModalSearch;
