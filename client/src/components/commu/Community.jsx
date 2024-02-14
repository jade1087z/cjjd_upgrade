import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const Community = () => {
    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>

                <ul className="board_w100">
                    <li>
                        <Link to="/view">
                            <div className="board_info">
                                <div className="board_title textCut">
                                    $board['boardTitle']
                                </div>
                                <div className="board_author textCut">
                                    $board['boardAuthor']
                                </div>
                                <div className="board_date">$boardRegTime</div>
                                <div className="board_view">
                                    <span>$board['boardView']</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="board_view.php?boardId=<?= $board['boardId'] ?>"
                            data-boardId="<?= $board['boardId'] ?>"
                        >
                            <div className="board_info">
                                <div className="board_title textCut">
                                    $board['boardTitle']
                                </div>
                                <div className="board_author textCut">
                                    $board['boardAuthor']
                                </div>
                                <div className="board_date">$boardRegTime</div>
                                <div className="board_view">
                                    <span>$board['boardView']</span>
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>

                <div className="board_page_option">
                    <div className="board_pages">
                        <ul className="pages_list">
                            <li className="prev">
                                <Link to="board.php?page={$prevPage}">
                                    &lt;
                                </Link>
                            </li>
                            <li className="$active">
                                <Link to="board.php?page={$i}">$i</Link>
                            </li>
                            <li className="next">
                                <Link to="board.php?page={$nextPage}">
                                    &gt;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="search_form">
                    <div className="selectBox2 ">
                        <FontAwesomeIcon icon={faAngleDown} />
                        <button className="label">게시글</button>
                        <ul className="optionList">
                            <li className="optionItem">게시글</li>
                            <li className="optionItem">제목만</li>
                            <li className="optionItem">작성자</li>
                        </ul>
                    </div>
                    <form
                        action="board_search.php"
                        method="get"
                        name=""
                        className="board_search_form "
                    >
                        <div className="board_search_option">
                            <div
                                id="search_input"
                                className="board_search_box "
                            >
                                <label for="search" className="blind">
                                    검색창
                                </label>
                                <input
                                    type="text"
                                    id="search"
                                    name="search"
                                    placeholder="검색어를 입력해주세요"
                                    autocomplete="off"
                                    className="im"
                                />
                                <button>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Community;
