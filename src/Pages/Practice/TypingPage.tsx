import React, { ChangeEvent } from 'react';
import RandomWord from 'random-words';
import { Box, Button, Chip, Divider, TextField, Typography } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { Shuffle } from '..';
import { StepperComponent } from '../../Components';
import { useNavigate } from 'react-router-dom';

interface ICard {
    id: number;
    title: string;
    translate: string;
}

interface IArrayCard {
    cards: Array<ICard>;
}

const TypingPage: React.FC<IArrayCard> = ({ cards }) => {
    const navigate = useNavigate();
    let [indexCard, setIndexCard] = React.useState(0);
    const [answers, setAnswers] = React.useState('');

    const [err, setErr] = React.useState(false);

    const handleContinue = () => {
        if (answers !== '') {
            setErr(false);
            if (cards[indexCard]?.title.toLowerCase() === answers.toLowerCase()) {
                axios
                    .put(`Card/update-status-card`, {
                        id: cards[indexCard]?.id,
                        status: 'completed',
                    })
                    .then(() => {
                        setIndexCard(++indexCard);
                    });
            } else {
                axios
                    .put(`Card/update-status-card`, {
                        id: cards[indexCard]?.id,
                        status: 'fail',
                    })
                    .then(() => {
                        setIndexCard(++indexCard);
                    });
            }
            if (cards.length === indexCard + 1) {
                navigate('/congratulation');
            }
            setAnswers('');
        } else {
            setErr(true);
        }
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <Box sx={{ width: '100%', m: 2 }}>
                <StepperComponent cards={cards} indexStep={indexCard} />
            </Box>

            <Box
                sx={{
                    width: '80%',
                    height: '50rem',
                    // mb: 8,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        border: '1px solid #1976d2',
                        width: '20em',
                        height: '8rem',
                        borderRadius: 4,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="h4" sx={{ letterSpacing: 2 }}>
                        {cards[indexCard]?.translate}
                    </Typography>
                </Box>

                <Box sx={{ width: '26rem', height: '10rem', mt: 2, p: 2 }}>
                    <input
                        value={answers}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setAnswers(event.target.value)
                        }
                        style={{ all: 'unset', width: '100%' }}
                        placeholder="input your answer"
                    />
                    <Divider />
                </Box>
                <Button
                    onClick={() => {
                        handleContinue();
                    }}
                    color={err ? 'error' : 'primary'}
                    variant={err ? 'contained' : 'text'}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default TypingPage;
