import { createSlice } from '@reduxjs/toolkit';

interface IAuth {
    token: any;
}

const initialAuth: IAuth = {
    token: null,
};

export const AuthReducer = createSlice({
    name: 'AuthReducer',
    initialState: initialAuth,
    reducers: {
        setToken: (state: IAuth, action) => {
            state.token = action.payload.token;
        },
        setLogout: (state: IAuth) => {
            state.token = null;
        },
    },
});

export const { setToken, setLogout } = AuthReducer.actions;
export default AuthReducer.reducer;
