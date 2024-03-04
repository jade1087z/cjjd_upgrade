import React, { useEffect } from "react";
import "./assets/scss/style.scss";
import Join from "./components/user/join/Join";
import MainLayout from "./MainLayout";
import Login from "./components/user/login/Login";
import getUserInfo from "./axios/user/getUserInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  setUser } from "./reducer/user";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const App: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

    useEffect(() => {
        const userInfo = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const user = await getUserInfo(token);
                dispatch(setUser(user))
            } 
        }
        userInfo()
    }, [dispatch])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/join' element={<Join />} />
                <Route path='/login' element={<Login />} />
                <Route path="/*" element={<MainLayout />} />
            </Routes>
        </BrowserRouter>

    );
};

export default App;
