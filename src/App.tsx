import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { SidePage, SignIn, SignUp, TagPage, AccountPage, CardPage } from './Pages';
import axios from 'axios';

function App() {
    const mode = useSelector((state: any) => state.mode);
    const token = useSelector((state: any) => state.token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.baseURL = 'https://localhost:7178/api/';

    return (
        <div className="App">
            <Router>
                <CssBaseline />
                <Routes>
                    <Route path="/" element={<SidePage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/home/tags" element={Boolean(token) ? <TagPage /> : <SignIn />} />
                    <Route
                        path="/home/cards/:tagname"
                        element={Boolean(token) ? <CardPage /> : <SignIn />}
                    />
                    <Route
                        path="/accout-page"
                        element={Boolean(token) ? <AccountPage /> : <SignIn />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
