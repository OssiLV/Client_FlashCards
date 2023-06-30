import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface ICard {
    id: number;
    title: string;
    translate: string;
}

interface IStepperComponent {
    cards: Array<ICard>;
    indexStep: number;
    // isCompleted: boolean;
    // handleNext: () => void;
}

const StepperComponent: React.FC<IStepperComponent> = ({ cards, indexStep }) => {
    const [activeStep, setActiveStep] = React.useState(-1);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    React.useEffect(() => {
        handleNext();
    }, [indexStep]);

    return (
        <Box sx={{}}>
            <Stepper
                activeStep={activeStep}
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {cards.map((card) => {
                    return (
                        <Step key={card.id} sx={{}}>
                            <StepLabel></StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        </Box>
    );
};

export default StepperComponent;
