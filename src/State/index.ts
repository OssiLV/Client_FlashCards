import { createSlice } from "@reduxjs/toolkit";

interface IState {
    mode: string,
    user: {
        id: string,
        userName: string,
        email: string,
        phoneNumber: number,
        emailConfirmed: boolean,
    },
    token: any
    tagId: number,
    cardId: number,
    modal: object,
    accessToken: string,
}

const initialState : IState = {
    token: null,
    mode: 'light',
    user: {
        id: "",
        userName: "",
        email: "",
        phoneNumber: 0,
        emailConfirmed: false,
    },
    tagId: 0,
    cardId: 0,
    modal: {
        create: false,
        update: false,
        delete: false,
        sendOTP: false,
        practice: false,
        name: "",
    },
    accessToken: "",
};

export const cardSlice = createSlice({
    name: 'FlashCard',
    initialState: initialState,
    reducers: {
        setMode: (state: IState) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
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
        setAccessToken: (state: IState, action) => {
            state.accessToken = action.payload.accessToken
        },
        setIsEmailCofirm: (state:IState, action) => {
            state.user.emailConfirmed = action.payload.emailConfirmed
        },
        setLogin: (state: IState, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state: IState) => {
            state.user = {
                id: "",
                userName: "",
                email: "",
                phoneNumber: 0,
                emailConfirmed: false,
            };
            state.token = null;
            state.tagId = 0;
            state.cardId = 0;
            state.modal = { create: false, update: false, delete: false,sendOTP: false, practice: false, name: ''};
            state.accessToken = "";
        },
    }
})

export const {setMode, setLogin, setLogout, setTagId, setCardId,setModal, setAccessToken, setIsEmailCofirm} = cardSlice.actions;
export default cardSlice.reducer;