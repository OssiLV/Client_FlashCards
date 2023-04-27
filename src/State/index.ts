import { createSlice } from "@reduxjs/toolkit";

interface IState {
    mode: string,
    user: object,
    token: any
    tagId: number,
}

const initialState : IState = {
    token: null,
    mode: 'light',
    user : {},
    tagId: 0,
};

export const cardSlice = createSlice({
    name: 'FlashCard',
    initialState: initialState,
    reducers: {
        setMode: (state: IState) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state: IState, action) => {
            
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setTagId: (state: IState, action) => {
            state.tagId = action.payload.tagId;
        },
        setLogout: (state: IState) => {
            state.user = {};
            state.token = null;
            state.tagId = 0;
        },
    }
})

export const {setMode, setLogin, setLogout, setTagId} = cardSlice.actions;
export default cardSlice.reducer;