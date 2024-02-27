import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/style.scss";
import Join from "./components/user/login/Join";
import MainLayout from "./MainLayout";
import { Provider } from "react-redux";
import { store } from "./reducer/store";
import Login from "./components/user/login/Login";

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/join' element={<Join />} />
                    <Route path='/login' element={<Login />} />
                    <Route path="/*" element={<MainLayout />} />
                </Routes>
            </BrowserRouter>
        </Provider>

    );
};

export default App;
