import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    SidePage,
    SignIn,
    SignUp,
    TagPage,
    AccountPage,
    CardPage,
    OTPVerifyEmailPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    OTPResetPasswordPage,
    PracticePage,
    ShufflePage,
    Congratulation,
    TypingPage,
} from './Pages';
import axios, { AxiosResponse } from 'axios';
import { ModalSearch } from './Components';

function App() {
    const _token = useSelector((state: any) => state.rootAuthReducer.token);

    const [cards, setCars] = React.useState([]);
    const _tagId = useSelector((state: any) => state.rootCurrentValueReducer.tagId);
    const _currentCardPage = useSelector(
        (state: any) => state.rootCurrentValueReducer.currentCardPage
    );

    React.useEffect(() => {
        axios
            .get(`Card/${_tagId}/${_currentCardPage}`)
            .then((res: AxiosResponse) => {
                setCars(res.data);
            })
            .catch((error) => console.error(`Cannot get Tags data: ${error}`));
    }, [_tagId, _currentCardPage]);

    axios.defaults.headers.common['Authorization'] = `Bearer ${_token}`;
    axios.defaults.baseURL = 'https://localhost:7178/api/';

    return (
        <div className="App">
            <Router>
                <ModalSearch />

                <Routes>
                    {/* <Route path="/" element={<SidePage />} /> */}
                    <Route path="/" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
                    <Route path="/resetpassword" element={<ResetPasswordPage />} />
                    <Route path="/OTPresetpassword" element={<OTPResetPasswordPage />} />

                    {/* Route Protected */}
                    <Route path="/home/tags" element={Boolean(_token) ? <TagPage /> : <SignIn />} />
                    <Route
                        path="/home/cards/:tagname"
                        element={Boolean(_token) ? <CardPage _cards={cards} /> : <SignIn />}
                    />
                    <Route
                        path="/account"
                        element={Boolean(_token) ? <AccountPage /> : <SignIn />}
                    />
                    <Route
                        path="/OTPverifyemail"
                        element={Boolean(_token) ? <OTPVerifyEmailPage /> : <SignIn />}
                    />

                    {/* PRACTICE */}
                    <Route
                        path="/practice"
                        element={Boolean(_token) ? <PracticePage /> : <SignIn />}
                    />
                    <Route
                        path="/practice/shuffle"
                        element={Boolean(_token) ? <ShufflePage cards={cards} /> : <SignIn />}
                    />
                    <Route
                        path="/practice/typing"
                        element={Boolean(_token) ? <TypingPage cards={cards} /> : <SignIn />}
                    />
                    <Route
                        path="/congratulation"
                        element={Boolean(_token) ? <Congratulation /> : <SignIn />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
