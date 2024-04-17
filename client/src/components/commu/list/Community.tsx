import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import postAllpage from '../../../axios/post/list/pageList';
import TopBtn from './TopBtn';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { MainPageSkeleton } from '../../../skeleton/postlist/PostListSkeleton';
import PostList from './DataList/PostList';

const Community: React.FC = () => {
    // const [postList, setPostList] = useState<Post[]>([]);
    // const [page, setPage] = useState<number>(1);
    // const [fetching, setFetching] = useState<Boolean>(false);
    // const [hasMore, setHasMore] = useState<Boolean>(true);

    // const pageEnd = useRef<HTMLDivElement>(null);
    // let observer: IntersectionObserver;

    // const fetchPostList = async (page: number) => {
    //     setFetching(true)
    //     const newPostList: Post[] = await postAllpage(page);
    //     if (newPostList.length === 0) {  // 데이터를 더 이상 가져올 수 없을 때
    //         if (observer) observer.disconnect();  // Observer를 중단합니다.
    //         return;  // 함수를 종료합니다.
    //     }
    //     const formattedPostList = newPostList.map((post) => ({
    //         ...post,
    //         regTime: format(new Date(post.regTime), "MM.dd"),
    //     }))
    //     setPostList(prevPosts => [...prevPosts, ...formattedPostList]);
    //     setFetching(false)
    // };

    // useEffect(() => {
    //     observer = new IntersectionObserver((entries) => {
    //         if (fetching || !hasMore) return;
    //         if (entries[0].intersectionRatio === 1) {
    //             setPage(prevPage => prevPage + 1);
    //         }
    //     }, { threshold: 1 });

    //     if (pageEnd.current) observer.observe(pageEnd.current)

    //     return (() => { observer.disconnect() })
    // }, [fetching, hasMore])

    // useEffect(() => {
    //     if(hasMore) fetchPostList(page)
    // }, [page, hasMore]);

    const usePostsInfiniteQuery = () => {
        return useInfiniteQuery({
            queryKey: ['postslist'],
            queryFn: postAllpage,
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


    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>
                <PostList data={data} />
            </div>
            <TopBtn ref={ref} />
        </>
    );
}

export default Community