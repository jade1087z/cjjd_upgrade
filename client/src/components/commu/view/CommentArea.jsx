import React, { useState } from "react";
import { Link } from "react-router-dom";

const CommentArea = ({ post }) => {
    const [comment, setComment] = useState();
    return (
        <>
            {comment ? (
                <div className="boxStyle roundCorner shaDow" id="view_comment">
                    <h4>
                        후기 <span id="commentCount"></span>
                    </h4>
                    <ul className="review_wrap">
                        <li>
                            <div className="review_text">
                                <strong className="textCut"></strong>
                                <p></p>
                                <Link to={"/"} className="modify">
                                    수정
                                </Link>
                                <Link to={"/"} className="delete">
                                    삭제
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="boxStyle roundCorner shaDow">
                    <h4>
                        후기 <span>0</span>
                    </h4>
                    <ul className="review_wrap">
                        <li>
                            <div className="review_text">
                                <span>아직 작성 된 후기가 없습니다.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default CommentArea;
