import React from "react";
import { Link } from "react-router-dom";

const HotList = () => {
    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <h4>
                인기 게시글 <span>HOT</span>
            </h4>
            <ul className="board_w100">
                <li>
                    <Link to="../board/board_view.php?boardId=<?=$board['boardId']?>">
                        <div className="board_info">
                            <div className="board_title textCut"></div>
                            <div className="board_author textCut"></div>
                            <div className="board_date">s</div>
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

export default HotList;
