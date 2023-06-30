import { createSlice } from '@reduxjs/toolkit';

interface IUser {
    user: {
        id: string;
        userName: string;
        email: string;
        phoneNumber: number;
        emailConfirmed: boolean;
    };

    accessToken: string;
}

const initialUser: IUser = {
    user: {
        id: '',
        userName: '',
        email: '',
        phoneNumber: 0,
        emailConfirmed: false,
    },
    accessToken: '',
};

export const UserReducer = createSlice({
    name: 'UserReducer',
    initialState: initialUser,
    reducers: {
        setUserName: (state: IUser, action) => {
            state.user.userName = action.payload;
        },
        setAccessToken: (state: IUser, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setIsEmailCofirm: (state: IUser, action) => {
            state.user.emailConfirmed = action.payload.emailConfirmed;
        },
        setLogin: (state: IUser, action) => {
            state.user = action.payload.user;
        },
        setLogout: (state: IUser) => {
            state.user = {
                id: '',
                userName: '',
                email: '',
                phoneNumber: 0,
                emailConfirmed: false,
            };
            state.accessToken = '';
        },
    },
});

export const { setUserName, setLogin, setLogout, setAccessToken, setIsEmailCofirm } =
    UserReducer.actions;
export default UserReducer.reducer;
