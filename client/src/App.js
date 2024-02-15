import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/scss/style.scss";
import Header from "./components/layout/Header";
import Mheader from "./components/layout/Mheader";
import Main from "./components/contents/Main";
import Aside from "./components/layout/Aside";
import Community from "./components/commu/Community";
import View from "./components/commu/view/View";
import Write from "./components/commu/write/Write";
import AcList from "./components/acpage/list/AcList";
import AcVIiew from "./components/acpage/view/AcVIiew";
import Mypage from "./components/user/mypage/Mypage";

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
                            <Route path="/write" element=<Write /> />
                            <Route path="/aclist" element=<AcList /> />
                            <Route path="/acview" element=<AcVIiew /> />
                            <Route path="/mypage" element=<Mypage /> />
                        </Routes>
                    </section>
                </main>
                <Aside />
            </BrowserRouter>
        </div>
    );
};

export default App;
