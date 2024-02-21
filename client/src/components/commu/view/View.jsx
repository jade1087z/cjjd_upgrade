import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import boardDetail from "./boardDetail";
import { format } from "date-fns";
import CommentArea from "./CommentArea";
import PostData from "./PostData";
import goodBtn from "./gootBtn";
const View = () => {

    const params = useParams().boardId;
    const [post, setPost] = useState();
    const [btnLike, setBtnLike] = useState()
   
    useEffect(() => {
        let isMounted = true
        const fetchPost = async () => {
            const data = await boardDetail(params, setBtnLike);
            if (data && data[0] && isMounted) {
                const formattedPost = {
                    ...data[0],
                    regTime: format(new Date(data[0].regTime), "MM.dd"),
                };
                setPost(formattedPost);
            }
        };

        fetchPost();
        return () => {
            isMounted = false
        }
    }, []);

    console.log(btnLike)
    
    

    return (
        <>
            <div className="board_view boxStyle roundCorner shaDow">
                <h4>
                    <Link to="board.php">자유게시판</Link>
                </h4>

                <PostData post={post} params={params} btnLike={btnLike} setBtnLike={setBtnLike}/>

                <div className="comment_summary">
                    <div className="button_list">
                        <button className="delete">삭제하기</button>
                        <button className="modify">수정하기</button>
                        <button className="good"
                        onClick={(e) => goodBtn(e, params, btnLike, setBtnLike, setPost)}
                        >추천하기</button>
                    </div>
                </div>
            </div>

            <CommentArea post={post} />

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
                                <Link to="/">$i</Link>
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
