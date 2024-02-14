import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/style.scss";
import Header from "./components/layout/Header";
import Mheader from "./components/layout/Mheader";
import Main from "./components/contents/Main";
import Aside from "./components/layout/Aside";
import Community from "./components/commu/Community";
import View from "./components/commu/view/View";

const App = () => {
    return (
        <div id="wrapper">
            <BrowserRouter>
                <Header />
                <Mheader />
                <main id="contents_area">
                    <section id="main_contents">
                        <Routes>
                            <Route path="/" element=<Main /> />
                            <Route path="/community" element=<Community /> />
                            <Route path="/view" element=<View /> />
                        </Routes>
                    </section>
                </main>
                <Aside />
            </BrowserRouter>
        </div>
    );
};

export default App;
