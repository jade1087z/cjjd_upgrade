import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Post } from '../../../interface/post/postInterface';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
const Query: React.FC = () => {

    const fetchPosts = async ({ pageParam = 1 }): Promise<Post[]> => {
        const response = await axios.get(`/api/post/pagelist?page=${pageParam}`);
        if (response.status === 200) {
            return response.data.postList;
        } else {
            console.log("else error", response);
            return [];
        }
    };
    const usePostsInfiniteQuery = () => {
        return useInfiniteQuery({
            queryKey: ['posts'],
            queryFn: fetchPosts,
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                return nextPage;
            },
            initialPageParam: 1
        });
    };
    const { data, fetchNextPage, hasNextPage } = usePostsInfiniteQuery()
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    console.log(data)

    const postlist = data?.pages[0];

    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>
                <ul className="board_w100">
                    {postlist && postlist?.map((post, key) => (
                        <li key={key}>
                            <Link to={`/view/${post.boardId}`}>
                                <div className="board_info">
                                    <div className="board_title textCut">
                                        {post.boardTitle}
                                    </div>
                                    <div className="board_author textCut">
                                        {post.boardAuthor}
                                    </div>
                                    <div className="board_date">
                                        {post.regTime instanceof Date ? post.regTime.toISOString() : post.regTime}
                                    </div>
                                    <div className="board_view">
                                        {post.boardView}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Query