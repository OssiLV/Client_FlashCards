import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { UserReducer, ModalReducer, CurrentValueReducer, AuthReducer } from './State';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToasterContext from './Components/Context/ToasterContext';
import App from './App';

const rootPersistConfig = {
    key: 'FlashCards',
    storage: storage,
    version: 1,
    whitelist: ['rootAuthReducer', 'rootUserReducer', 'rootCurrentValueReducer'],
};

const rootReducer = combineReducers({
    rootAuthReducer: AuthReducer,
    rootUserReducer: UserReducer,
    rootModalReducer: ModalReducer,
    rootCurrentValueReducer: CurrentValueReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <GoogleOAuthProvider clientId="567968380326-lp6nvrpaqd2a96ho585n5td23bl7aboh.apps.googleusercontent.com">
                <CssBaseline />
                <ToasterContext />
                <App />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);
