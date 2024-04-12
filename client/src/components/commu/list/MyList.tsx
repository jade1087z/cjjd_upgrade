import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Post, RouteParams } from '../../../interface/post/postInterface';
import { format } from 'date-fns';
import TopBtn from './TopBtn';
import authpagelist from '../../../axios/post/list/authpagelist';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducer/store';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainPageSkeleton } from '../../../skeleton/postlist/PostListSkeleton';
import PostList from './DataList/PostList';

const MyList: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            alert('로그아웃 되었습니다.')
            navigate('/')
        }
    }, [user])
    const { youId } = useParams<RouteParams>();

    const params: string | undefined = youId;

    const usePostsInfiniteQuery = () => {
        return useInfiniteQuery({
            queryKey: ['MyPostsList'],
            queryFn: ({ pageParam = 1 }) => authpagelist({ pageParam, params }),
            getNextPageParam: (lastPage, allPages) => {
                const nextPage = allPages.length + 1;
                console.log(nextPage)
                return nextPage;
            },
            initialPageParam: 1
        });
    };
    const { data, fetchNextPage, hasNextPage, isFetching } = usePostsInfiniteQuery()
    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage, fetchNextPage])

    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>내가 쓴 게시글</h4>
            {isFetching ? (<MainPageSkeleton />) : (<PostList data={data}/>)}
            <TopBtn ref={ref} />
        </div>
    )
}

export default MyList