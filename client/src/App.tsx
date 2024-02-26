import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/style.scss";
import Join from "./components/user/login/Join";
import MainLayout from "./MainLayout";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/join' element={<Join />} />
                <Route path="/*" element={<MainLayout />} />
            </Routes>
        </BrowserRouter>

    );
};

export default App;
