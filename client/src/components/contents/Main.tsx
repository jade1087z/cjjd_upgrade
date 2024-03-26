import AcRank from "../acpage/rank/AcRank";
import TopBtn from "../commu/list/TopBtn";
import HotList from "./page/HotList";
import RecentList from "./page/RecentList";


const Main = () => {

    return (
        <>
            <AcRank />
            <HotList />
            <RecentList />
            <TopBtn />
        </>
    );
};

export default Main;
