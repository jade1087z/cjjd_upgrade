import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../../interface/post/postInterface";
import postAll from "../../../axios/post/list/listAll";
import { useQuery } from "@tanstack/react-query";

const RecentList: React.FC = () => {
    const { data, error, isLoading } = useQuery<Post[], Error>({queryKey: ['posts'], queryFn: postAll});
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred</div>;

    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>
                최신 게시글 <span>NEW</span>
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

export default RecentList;
