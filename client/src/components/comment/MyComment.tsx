import React, { useEffect, useRef, useState } from 'react'
import { comment, commentResponse } from "../../interface/post/commentInterface";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RouteParams } from '../../interface/post/postInterface';
import { RootState } from '../../reducer/store';
import { useSelector } from 'react-redux';
import TopBtn from '../commu/list/TopBtn';
import myCommentList from '../../axios/comment/LIST/myList';
import { format } from 'date-fns';


const MyComment: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const { youId } = useParams<RouteParams>();
    const params: string | undefined = youId;
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('로그아웃 되었습니다.')
            navigate('/')
        }
    }, [user])

    const [comment, setComment] = useState<comment[]>([]);
    
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>(1);
    const [fetching, setFetching] = useState<Boolean>(false);
    const [hasMore, setHasMore] = useState<Boolean>(true);

    const pageEnd = useRef<HTMLDivElement>(null);

    let observer: IntersectionObserver;

    const fetchPostList = async (page: number) => {
        setFetching(true)
        const result: any | commentResponse = await myCommentList({ params, page });
        const newCommentList = result.result;
        if (result.result?.length === 0) {  // 데이터를 더 이상 가져올 수 없을 때
            if (observer) observer.disconnect();  // Observer를 중단합니다.
            return;  // 함수를 종료합니다.
        }

        const formattedPostList = newCommentList.map((prevComment) => ({
            ...prevComment,
            regTime: format(new Date(prevComment.regTime), "MM.dd"),
        }))

        setComment(prevPosts => [...prevPosts, ...formattedPostList]);
        setTotal(result.total)
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
        <>
            <div className="boxStyle roundCorner shaDow">
                <h4>
                    댓글 <span id="commentCount">{total}</span>
                </h4>
                <ul className="review_wrap">
                    {comment?.map((li, key) => (
                        <li key={key}>
                            <Link to={li.boardId ? `/view/${li.boardId}` : `/acview/${li.acId}`}>
                                <div className="review_text">
                                    <strong className="textCut">{li.boardId ? `자유게시판` : `리뷰페이지`}</strong>
                                    <p className="textCut">{li.commentName}</p>
                                    <p>{li.commentMsg}</p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div ref={pageEnd}></div>
            <TopBtn />
        </>
    );
}

export default MyComment