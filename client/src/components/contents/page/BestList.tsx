import React from "react";
import { Link } from "react-router-dom";

const BestList = () => {
    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>
                추천 게시글 <span>Pick!</span>
            </h4>
            <ul className="board_w100">
                <li>
                    <Link to="../board/board_view.php?boardId=">
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
        </div>
    );
};

export default BestList;
