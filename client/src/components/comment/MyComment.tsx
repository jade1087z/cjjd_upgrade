import React, { useEffect, useRef, useState } from 'react'
import { comment, commentResponse } from "../../interface/post/commentInterface";
import { useNavigate, useParams } from 'react-router-dom';
import { RouteParams } from '../../interface/post/postInterface';
import { RootState } from '../../reducer/store';
import { useSelector } from 'react-redux';
import TopBtn from '../commu/list/TopBtn';
import myCommentList from '../../axios/comment/LIST/myList';
import { format } from 'date-fns';


const MyComment:React.FC = () => {
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

    const [page, setPage] = useState<number>(1);
    const [fetching, setFetching] = useState<Boolean>(false);
    const [hasMore, setHasMore] = useState<Boolean>(true);

    const pageEnd = useRef<HTMLDivElement>(null);

    let observer: IntersectionObserver;

    const fetchPostList = async (page: number) => {
        setFetching(true)
        const newCommentList: comment[] = await myCommentList({ page, params });
        if (newCommentList?.length === 0) {  // 데이터를 더 이상 가져올 수 없을 때
            if (observer) observer.disconnect();  // Observer를 중단합니다.
            return;  // 함수를 종료합니다.
        }
        const formattedPostList = newCommentList.map((post) => ({
            ...post,
            regTime: format(new Date(post.regTime), "MM.dd"),
        }))
        setComment(prevPosts => [...prevPosts, ...formattedPostList]);
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
        <div className="boxStyle roundCorner shaDow">
            <h4>
                댓글 <span id="commentCount">{comment?.length}</span>
            </h4>
            <ul className="review_wrap">
                {/* {comment.map((li, key) => (
                    <li key={key}>
                        <div className="review_text">
                            <strong className="textCut">{li.commentName}</strong>
                            <p>{li.commentMsg}</p>
                        </div>
                    </li>
                ))} */}
                <TopBtn/>
            </ul>
        </div>
    );
}

export default MyComment