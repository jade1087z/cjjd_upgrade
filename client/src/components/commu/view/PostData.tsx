import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import goodBtn from "../../../axios/post/view/gootBtn";
import { Post } from "../../../interface/postInterface";

interface PostDataProps {
    post: Post | null;
    params: number | string | undefined
    btnLike: boolean;
    setBtnLike: (liked: boolean) => void;
    setPost: (post: Post) => void;
    myMemberId: number
}

const PostData: React.FC<PostDataProps> = ({post,params,btnLike,setBtnLike,setPost, myMemberId}) => {

    return (
        <>
            {post ? (
                <>
                    <div className="view_wrap">
                        <div className="view_top">
                            <h5> {post.boardTitle}</h5>
                        </div>

                        <div className="view_box">
                            <div className="user_info not_user">
                                <div className="user_info_box">
                                    <Link to={`/Authors/${post.boardAuthor}`}>
                                            <p>{post.boardAuthor}님의 게시글 더보기</p>
                                    </Link>
                                </div>
                            </div>
                            <div className="view_info">
                                <div className="info_list">
                                    <div className="view_num boardRegtime">
                                        {post.regTime instanceof Date ? post.regTime.toISOString() : post.regTime}
                                    </div>
                                    <FontAwesomeIcon icon={faHeart} className={btnLike ? 'like' : ''} 
                                    onClick={(e:React.MouseEvent<SVGSVGElement>) => goodBtn({e, params, btnLike, setBtnLike, setPost, myMemberId})} />
                                    <div className="view_num boardLike">
                                        추천수: <em>{post.boardLike}</em>
                                    </div>
                                    <div className="view_num">
                                        조회수: <em>{post.boardView}</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="board_desc">
                        <div className="board_detail">
                            <div className="board_desc_img">
                                <img src="/" alt="image"/>
                            </div>
                           <em className="scrollStyle" > {post.boardContents}</em>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="view_wrap">
                        <div className="view_top">
                            <h5> </h5>
                        </div>

                        <div className="view_box">
                            <div className="user_info not_user">
                                <div className="user_info_box">
                                    <Link to="board_member_info.php?boardId=<?= $boardId ?>">
                                        <p>
                                            <em></em>님의 게시글 더보기
                                        </p>
                                    </Link>
                                </div>
                            </div>
                            <div className="view_info">
                                <div className="info_list">
                                    <div className="view_num boardRegtime">
                                        <em>s</em>
                                    </div>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <div className="view_num boardLike">
                                        추천수: <em>0</em>
                                    </div>
                                    <div className="view_num">
                                        조회수: <em>0</em>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="board_desc">
                        <div className="board_detail">
                            <div className="board_desc_img"></div>
                            <em className="scrollStyle"></em>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default PostData;
