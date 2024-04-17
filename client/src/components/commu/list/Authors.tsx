import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { RouteParams } from '../../../interface/post/postInterface';
import authpagelist from '../../../axios/post/list/authpagelist';
import TopBtn from './TopBtn';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainPageSkeleton } from '../../../skeleton/postlist/PostListSkeleton';
import PostList from './DataList/PostList';

const Authors: React.FC = () => {
    const { boardAuthor } = useParams<RouteParams>();
    const params: string | undefined = boardAuthor;

    const usePostsInfiniteQuery = () => {
        return useInfiniteQuery({
            queryKey: ['AuthPostsList'],
            queryFn: ({ pageParam = 1 }) => authpagelist({ pageParam, params }),
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                console.log(nextPage)
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

    const author = data?.pages[0]?.[0]?.boardAuthor;

    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>{author} 님의 게시글</h4>
            <PostList data={data}/>

            <TopBtn ref={ref} />
        </div>
    );
}

export default Authors