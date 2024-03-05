import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Mheader from "./components/layout/Mheader";
import Main from "./components/contents/Main";
import Aside from "./components/layout/Aside";
import View from "./components/commu/view/View";
import Write from "./components/commu/write/Write";
import AcList from "./components/acpage/list/AcList";
import AcVIiew from "./components/acpage/view/AcVIiew";
import Mypage from "./components/user/mypage/Mypage";
import Community from "./components/commu/Community";
import { RootState } from './reducer/store';
import { useSelector } from 'react-redux';
import AsideNot from './components/layout/AsideNot';
import PostUpdate from './components/commu/update/PostUpdate';

const MainLayout:React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const youId = user?.youId;
    if (user) {
        console.log(user, 'redux user');
      }
    // user 값이 있을때만 
    
    return (
        <div id="wrapper">
            <Header />
            <Mheader />
            <main id="contents_area">
                <section id="main_contents">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/view/:boardId" element={<View />} />
                        <Route path="/update/:boardId" element={<PostUpdate />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/aclist" element={<AcList />} />
                        <Route path="/acview" element={<AcVIiew />} />
                        <Route path="/mypage" element={<Mypage />} />
                    </Routes>
                </section>
            </main>
            { !youId ? <AsideNot/> : <Aside/> }
            {/* youId가 없는 경우 logout = asideNot */}
        </div>
    )
}

export default MainLayout