import React from 'react';
import RandomWord from 'random-words';
import { Box, Button, Chip, Typography } from '@mui/material';
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

const ShufflePage: React.FC<IArrayCard> = ({ cards }) => {
    const navigate = useNavigate();
    let [indexCard, setIndexCard] = React.useState(0);

    const [indexChip, setIndexChip] = React.useState(-1);
    const [valueAnswer, setValueAnswer] = React.useState('');
    const [err, setErr] = React.useState(false);

    const [answers, setAnswers] = React.useState<Array<string>>([]);

    const handleContinue = () => {
        if (indexChip >= 0) {
            setErr(false);
            if (cards[indexCard]?.title === valueAnswer) {
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
        } else {
            setErr(true);
        }
    };

    React.useEffect(() => {
        const threeRandomWord = RandomWord({ exactly: 3 });
        threeRandomWord.push(cards[indexCard]?.title);
        setAnswers(Shuffle(threeRandomWord));
    }, [indexCard]);

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

                <Box sx={{ width: '26rem', height: '10rem', mt: 2, p: 2, ml: 7 }}>
                    {answers.map((value, index) => (
                        <Chip
                            key={index}
                            label={value}
                            sx={{ m: 1.2, cursor: 'pointer', width: '4rem' }}
                            onClick={() => {
                                setErr(false);
                                setValueAnswer(value);
                                setIndexChip(index);
                            }}
                            color={index === indexChip ? 'success' : 'default'}
                        />
                    ))}
                </Box>
                <Button
                    onClick={() => {
                        handleContinue();
                        setIndexChip(-1);
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

export default ShufflePage;
