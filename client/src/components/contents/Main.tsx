import React, { useRef } from "react";
import { Link } from "react-router-dom";
import AcRank from "../acpage/rank/AcRank";
import HotList from "./page/HotList";
import RecentList from "./page/RecentList";
import BestList from "./page/BestList";
import BtnWrap from "../user/join/BtnWrap";
import TopBtn from "../commu/list/TopBtn";

const Main = () => {

    return (
        <>
            <AcRank />
            <HotList />
            <RecentList />
            <TopBtn  />
            {/* <BestList /> */}
        </>
    );
};

export default Main;
