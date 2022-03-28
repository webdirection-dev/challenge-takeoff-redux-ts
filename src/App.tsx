import React, {FC} from 'react';
import {Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

import Header from "./components/layout/Header";

import RequireAuth from "./hoc/RequireAuth";


const App: FC = () => {

    return (
        <>
            <Header />

            <Routes>
                <Route path='/' element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                } />

                <Route path='/challenge-takeoff-redux-ts/' element={
                    <RequireAuth>
                        <HomePage />
                    </RequireAuth>
                } />

                <Route path='/login' element={<LoginPage />} />

                <Route path='/register' element={<RegisterPage />} />

                <Route path='*' element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
