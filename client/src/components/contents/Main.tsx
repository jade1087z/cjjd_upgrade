import React from "react";
import { Link } from "react-router-dom";
import AcRank from "../acpage/rank/AcRank";
import HotList from "./page/HotList";
import RecentList from "./page/RecentList";
import BestList from "./page/BestList";

const Main = () => {
    return (
        <>
            <AcRank />
            <HotList />
            <RecentList />
            <BestList />
        </>
    );
};

export default Main;
