import React, { Profiler, useEffect } from "react";
import "./assets/scss/style.scss";
import Join from "./components/user/join/Join";
import MainLayout from "./MainLayout";
import Login from "./components/user/login/Login";
import getUserInfo from "./axios/user/getUserInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./reducer/user";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const App: React.FC = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
    // IndexedDB persister 생성
  
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: Infinity,
                refetchOnWindowFocus: false,
                refetchOnMount: false,
            }
        }
    })
    
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

    useEffect(() => {
        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll"))
                .default;

            const locomotiveScroll = new LocomotiveScroll();
        })();
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path='/join' element={<Join />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/*" element={<MainLayout />} />
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
};

export default App;
