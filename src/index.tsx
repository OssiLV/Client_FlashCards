import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import cardReducer from './State';
import { configureStore } from '@reduxjs/toolkit';
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
import App from './App';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, cardReducer);
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
            <GoogleOAuthProvider clientId="1082277985374-jdlutno6vreod8pi44dpdebmdsjoj836.apps.googleusercontent.com">
                <CssBaseline />
                <App />
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);
