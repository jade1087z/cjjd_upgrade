import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Post, RouteParams } from '../../../interface/post/postInterface';
import { format } from 'date-fns';
import TopBtn from './TopBtn';
import authpagelist from '../../../axios/post/list/authpagelist';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducer/store';

const MyList:React.FC = () => {
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

    const [postList, setPostList] = useState<Post[]>([]);
    const [page, setPage] = useState<number>(1);
    const [fetching, setFetching] = useState<Boolean>(false);
    const [hasMore, setHasMore] = useState<Boolean>(true);

    const pageEnd = useRef<HTMLDivElement>(null);

    let observer: IntersectionObserver;

    const fetchPostList = async (page: number) => {
        setFetching(true)
        const newPostList: Post[] = await authpagelist({ page, params });
        if (newPostList.length === 0) {  // 데이터를 더 이상 가져올 수 없을 때
            if (observer) observer.disconnect();  // Observer를 중단합니다.
            return;  // 함수를 종료합니다.
        }
        const formattedPostList = newPostList.map((post) => ({
            ...post,
            regTime: format(new Date(post.regTime), "MM.dd"),
        }))
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
        if (hasMore) fetchPostList(page)
    }, [page, hasMore]);

  return (
    <div className="best_list boxStyle roundCorner shaDow">
            <h4>내가 쓴 게시글</h4>
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
                <TopBtn pageEnd={pageEnd} />
            </ul>
        </div>
  )
}

export default MyList