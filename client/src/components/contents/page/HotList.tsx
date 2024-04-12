import React from "react";
import { Post } from "../../../interface/post/postInterface";
import bestPost from "../../../axios/post/list/bestList";
import { useQuery } from "@tanstack/react-query";
import DataList from "./dataFatching/DataList";
import { MainPageSkeleton } from "../../../skeleton/postlist/PostListSkeleton";

const HotList: React.FC = () => {

    // useEffect(() => {
    //     const fetchPostList = async () => {
    //         const newPostList: Post[] = await bestPost();
    //         if (newPostList) {
    //             const formattedPostList = newPostList.map((post) => ({
    //                 ...post,
    //                 regTime: format(new Date(post.regTime), "MM.dd"),
    //             }))
    //             if (JSON.stringify(postList) !== JSON.stringify(formattedPostList)) setPostList(formattedPostList);
    //         }
    //     };
    //     fetchPostList();
    // }, [postList]);

    const { data = [], error, isLoading, isFetching } = useQuery<Post[], Error>({ queryKey: ['bestPost'], queryFn: bestPost, placeholderData: [] });
    console.log(isLoading)
    if (error) return <div>An error occurred</div>;
    if (!Array.isArray(data)) return <div>Data is not an array</div>;

    return (
        <div className="mainpage best_list boxStyle roundCorner shaDow">
        <h4>인기 게시글 <span>HOT</span></h4>
        {isFetching ? (<MainPageSkeleton />) : (<DataList data={data} /> )}
        </div>
    );
};

export default HotList;
