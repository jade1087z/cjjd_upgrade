import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { Post } from '../../../interface/postInterface';
import { format } from 'date-fns';
import postAllpage from '../../../axios/post/list/pageList';
import TopBtn from './TopBtn';

const Community: React.FC = () => {
    const [postList, setPostList] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [fetching, setFetching] = useState<Boolean>(false);
    const [hasMore, setHasMore] = useState<Boolean>(true);

    const pageEnd = useRef<HTMLDivElement>(null);
    let observer: IntersectionObserver;

    const fetchPostList = async (page: number) => {
        setFetching(true)
        const newPostList: Post[] = await postAllpage(page);
        if (newPostList.length === 0) {  // 데이터를 더 이상 가져올 수 없을 때
            if (observer) observer.disconnect();  // Observer를 중단합니다.
            return;  // 함수를 종료합니다.
        }
        const formattedPostList = newPostList.map((post) => ({
            ...post,
            regTime: format(new Date(post.regTime), "MM.dd"),
        })).sort((a, b) => Date.parse(b.regTime) - Date.parse(a.regTime));
        setPostList(prevPosts => [...prevPosts, ...formattedPostList]);
        setFetching(false)
    };

    useEffect(() => {
        observer = new IntersectionObserver((entries) => {
            if (fetching || !hasMore) return;
            if (entries[0].intersectionRatio === 1) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1 });

        if (pageEnd.current) observer.observe(pageEnd.current)

        return (() => { observer.disconnect() })
    }, [fetching, hasMore])

    useEffect(() => {
        if(hasMore) fetchPostList(page)
    }, [page, hasMore]);

    // ref 도달해서 멈춰있을 때도 계속 서버로의 요청이 일어난다. 이러한 부분을 막아야함 

    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>
                <ul className="board_w100">
                    {postList &&
                        postList.map((post, key) => (
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
            <TopBtn pageEnd={pageEnd}/>
        </>
    );
}

export default Community