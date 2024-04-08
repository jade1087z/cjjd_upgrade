import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Mheader from "./components/layout/Mheader";
import Main from "./components/contents/Main";
import Aside from "./components/layout/Aside";
import View from "./components/commu/view/View";
import Write from "./components/commu/write/Write";
import PostUpdate from './components/commu/update/PostUpdate';
import AcList from "./components/acpage/list/AcList";
import AcVIiew from "./components/acpage/view/AcVIiew";
import Mypage from "./components/user/mypage/Mypage";
import Community from "./components/commu/list/Community";
import { RootState } from './reducer/store';
import { useSelector } from 'react-redux';
import AsideNot from './components/layout/AsideNot';
import Authors from './components/commu/list/Authors';
import TopBtn from './components/commu/list/TopBtn';
import MyList from './components/commu/list/MyList';
import MyComment from './components/comment/MyComment';
import ModifyUser from './components/user/mypage/ModifyUser';

const MainLayout:React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const youId = user?.youId;
    console.log(user)
    
    return (
        <div id="wrapper">
            <Header />
            <Mheader />
            <main id="contents_area">
                <section id="main_contents">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/community" element={<Community />} />
                        <Route path="/Authors/:boardAuthor" element={<Authors />} />
                        <Route path="/myList/:youId" element={<MyList />} />
                        <Route path="/myComment/:youId" element={<MyComment />} />
                        <Route path="/view/:boardId" element={<View />} />
                        <Route path="/update/:boardId" element={<PostUpdate />} />
                        <Route path="/write" element={<Write />} />
                        <Route path="/aclist" element={<AcList />} />
                        <Route path="/acview/:acId" element={<AcVIiew />} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/profileModify" element={<ModifyUser />} />
                    </Routes>
                </section>
            </main>
            { !youId ? <AsideNot/> : <Aside/> }
            {/* youId가 없는 경우 logout = asideNot */}
        </div>
    )
}

export default MainLayout