import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import boardDetail from "../../../axios/post/view/boardDetail";
import { format } from "date-fns";
import CommentArea from "./CommentArea";
import PostData from "./PostData";
import goodBtn from "../../../axios/post/view/gootBtn";
import { Post } from "../../../interface/postInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";

interface RouteParams {
    [key: string]: string | undefined;
}

const View: React.FC = () => {
    const user = useSelector((state:RootState) => state.user)
    const myMemberId = user?.myMemberId
    const { boardId } = useParams<RouteParams>();
    const params: number | string | undefined = boardId === undefined ? undefined : (isNaN(Number(boardId)) ? boardId : Number(boardId));

    const [post, setPost] = useState<Post | null>(null);
    const [btnLike, setBtnLike] = useState<boolean>(false)
   
    useEffect(() => {
        let isMounted = true
        const fetchPost = async () => {
            const data: Post | undefined = await boardDetail(params, setBtnLike, myMemberId);
            if (data && isMounted) {
                try {
                    const formattedPost: Post | undefined  = {
                        ...data,
                        regTime: format(new Date(data.regTime), "MM.dd"),
                    };
                    setPost(formattedPost);    
                } catch (error) {
                    console.error('Error formatting date:', error);
                }
            } 
        };
        fetchPost();
        return () => {
            isMounted = false
        }
    }, [myMemberId]);
    return (
        <>
            <div className="board_view boxStyle roundCorner shaDow">
                <h4>
                    <Link to="board.php">자유게시판</Link>
                </h4>

                
                {post && <PostData post={post} params={params} btnLike={btnLike} setBtnLike={setBtnLike} setPost={setPost} myMemberId={myMemberId}/>}

                <div className="comment_summary">
                    <div className="button_list">
                        <button className="delete">삭제하기</button>
                        <button className="modify">수정하기</button>
                        <button className="good"
                        onClick={(e) => goodBtn(e, params, btnLike, setBtnLike, setPost,myMemberId)}
                        >추천하기</button>
                    </div>
                </div>
            </div>

                {post && <CommentArea />}

            <div className="boxStyle roundCorner shaDow">
                <h4>후기 작성하기</h4>
                <div className="review_add">
                    <textarea
                        className="scrollStyle"
                        name="review_write"
                        id="review_write"
                        placeholder="자유롭게 의견을 나눠보세요."
                    ></textarea>
                    <button type="button" id="commentWriteBtn">
                        작성하기
                    </button>
                </div>
            </div>

            <div className="boxStyle roundCorner shaDow">
                <ul className="board_w100">
                    <li className="<?= $thisId ?>">
                        <Link to="/">
                            <div className="board_info">
                                <div className="board_title textCut"></div>
                                <div className="board_author textCut"></div>
                                <div className="board_date"></div>
                                <div className="board_view">
                                    <span></span>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
                <div className="board_page_option">
                    <div className="board_pages">
                        <ul className="pages_list">
                            <li className="prev">
                                <Link to="/">&lt;</Link>
                            </li>

                            <li className="active">
                                <Link to="/">1</Link>
                            </li>
                            <li className="next">
                                <Link to="/">&gt;</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default View;
