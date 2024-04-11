import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../../interface/post/postInterface";
import bestPost from "../../../axios/post/list/bestList";
import { useQuery } from "@tanstack/react-query";

interface PostResponse {
    postList: Post[];
}
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

    const { data, error, isLoading } = useQuery<Post[], Error>({queryKey: ['posts'], queryFn: bestPost, });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;

    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>
                인기 게시글 <span>HOT</span>
            </h4>
            <ul className="board_w100">
                {data && data.map((post, key) => (
                    <li key={key}>
                        <Link to={`/view/${post.boardId}`}>
                            <div className="board_info">
                                <div className="board_title textCut">{post.boardTitle} </div>
                                <div className="board_author textCut">{post.boardAuthor}</div>
                                <div className="board_date">{post.regTime instanceof Date ? post.regTime.toISOString() : post.regTime}</div>
                                <div className="board_view">조회수: {post.boardView}</div>
                                <div className="board_comment">댓글: {post.boardComment}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HotList;
