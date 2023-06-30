import { createSlice } from '@reduxjs/toolkit';

interface IModalReducer {
    modal: object;
}

const initModalReducer: IModalReducer = {
    modal: {
        create: false,
        update: false,
        delete: false,
        resetPassword: false,
        sendOTP: false,
        practice: false,
        name: '',
    },
};

export const ModalReducer = createSlice({
    name: 'ModalReducer',
    initialState: initModalReducer,
    reducers: {
        setModal: (state: IModalReducer, action) => {
            state.modal = action.payload.modal;
        },
    },
});

export const { setModal } = ModalReducer.actions;
export default ModalReducer.reducer;
