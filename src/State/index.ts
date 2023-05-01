import { createSlice } from "@reduxjs/toolkit";

interface IState {
    mode: string,
    user: object,
    token: any
    tagId: number,
    cardId: number,
    modal: object,
}

const initialState : IState = {
    token: null,
    mode: 'light',
    user : {},
    tagId: 0,
    cardId: 0,
    modal: {
        create: false,
        update: false,
        delete: false,
        name: "",
    },
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
        setCardId: (state: IState, action) => {
            state.cardId = action.payload.cardId;
        },
        setModal: (state: IState, action) => {
            state.modal = action.payload.modal;
        },
        setLogout: (state: IState) => {
            state.user = {};
            state.token = null;
            state.tagId = 0;
            state.cardId = 0;
            state.modal = { create: false, update: false, delete: false, name: ''};
        },
    }
})

export const {setMode, setLogin, setLogout, setTagId, setCardId,setModal} = cardSlice.actions;
export default cardSlice.reducer;