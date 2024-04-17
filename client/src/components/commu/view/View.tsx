import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import boardDetail from "../../../axios/post/view/boardDetail";
import { format } from "date-fns";
import CommentArea from "../../comment/CommentArea";
import PostData from "./PostData";
import goodBtn from "../../../axios/post/view/gootBtn";
import { Post, RouteParams } from "../../../interface/post/postInterface";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import updateCheck from "../../../axios/post/update/updateCheck";
import deletePost from "../../../axios/post/deletPost";
import CmmentWrite from "../../comment/CmmentWrite";

const View: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId
    const { boardId } = useParams<RouteParams>();
    const params: number | string | undefined = boardId === undefined ? undefined : (isNaN(Number(boardId)) ? boardId : Number(boardId));

    const [post, setPost] = useState<Post | null>(null);
    const [btnLike, setBtnLike] = useState<boolean>(false)
    const [commentUpdate, setCommentUpdate] = useState<boolean>(false)
    const [type, setType] = useState<string>('board')

    useEffect(() => {
        let isMounted = true
        const fetchPost = async () => {
            const data: Post | undefined = await boardDetail({ params, setBtnLike, myMemberId });
            if (data && isMounted) {
                try {
                    const formattedPost: Post | undefined = {
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
                <h4><Link to="/community">자유게시판</Link></h4>

                {post && <PostData post={post} params={params} btnLike={btnLike} setBtnLike={setBtnLike} setPost={setPost} myMemberId={myMemberId} />}

                <div className="comment_summary">
                    <div className="button_list">
                        <button className="delete" onClick={(e) => deletePost(e, params, myMemberId)}>삭제하기</button>
                        <button className="modify" onClick={(e) => updateCheck(e, params, myMemberId)}>수정하기</button>
                        <button className="good" onClick={(e) => goodBtn({ e, params, btnLike, setBtnLike, setPost, myMemberId })}>추천하기</button>
                    </div>
                </div>
            </div>
            {post && <CommentArea params={params} commentUpdate={commentUpdate} myMemberId={myMemberId} setCommentUpdate={setCommentUpdate} type={type} />}
            <CmmentWrite myMemberId={myMemberId} params={params} setCommentUpdate={setCommentUpdate} type={type} />
        </>
    );
};

export default View;
