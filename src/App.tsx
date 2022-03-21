import React from 'react';
import {Routes, Route} from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

import RequireAuth from "./hoc/RequireAuth";


function App() {

    return (
        <Routes>
            {/*<Route path='/' element={<HomePage />} />*/}
            <Route path='/' element={
                <RequireAuth>
                    <HomePage />
                </RequireAuth>
            } />

            <Route path='/login' element={<LoginPage />} />

            <Route path='/register' element={<RegisterPage />} />

            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
