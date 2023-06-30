import { createSlice } from '@reduxjs/toolkit';

interface ICurrentValue {
    currentCardPage: number;
    tagId: number;
    cardId: number;
}

const initialCurrentValue: ICurrentValue = {
    currentCardPage: 1,
    tagId: 0,
    cardId: 0,
};

export const CurrentValueReducer = createSlice({
    name: 'CurrentValueReducer',
    initialState: initialCurrentValue,
    reducers: {
        setCurrentCardPage: (state: ICurrentValue, action) => {
            state.currentCardPage = action.payload.currentCardPage;
        },
        setTagId: (state: ICurrentValue, action) => {
            state.tagId = action.payload.tagId;
        },
        setCardId: (state: ICurrentValue, action) => {
            state.cardId = action.payload.cardId;
        },
    },
});

export const { setCurrentCardPage, setTagId, setCardId } = CurrentValueReducer.actions;
export default CurrentValueReducer.reducer;
