import React from "react";
import { Post } from "../../../interface/post/postInterface";
import postAll from "../../../axios/post/list/listAll";
import { useQuery } from "@tanstack/react-query";
import DataList from "./dataFatching/DataList";
import { MainPageSkeleton } from "../../../skeleton/postlist/PostListSkeleton";


const RecentList: React.FC = () => {
    const { data = [], error, isLoading, isFetching } = useQuery<Post[], Error>({ queryKey: ['postsAll'], queryFn: postAll, placeholderData: [] });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;
    if (!Array.isArray(data)) return <div>Data is not an array</div>;
    return (
        <div className="mainpage best_list boxStyle roundCorner shaDow">
            <h4>최신 게시글 <span>NEW</span></h4>
            {isFetching ? (<MainPageSkeleton />) : (<DataList data={data} />)}
        </div>
    );
};

export default RecentList;
