import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const View = () => {
    return (
        <>
            <div className="board_view boxStyle roundCorner shaDow">
                <h4>
                    <Link to="board.php">자유게시판</Link>
                </h4>

                <div className="view_wrap">
                    <div className="view_top">
                        <h5> f</h5>
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
                                    <em>regtime</em>
                                </div>
                                <FontAwesomeIcon icon={faHeart} />
                                <div className="view_num boardLike">
                                    추천수: <em></em>
                                </div>
                                <div className="view_num">
                                    조회수: <em></em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="board_desc">
                    <div className="board_detail">
                        <div className="board_desc_img">
                            <img
                                src="../assets/DBIMG/<?= $boardInfo['boardImgFile'] ?>"
                                alt="<?= $boardInfo['boaldTitle'] ?>"
                            />
                        </div>
                        <em className="scrollStyle"></em>
                    </div>
                </div>
                <div className="comment_summary">
                    <div className="button_list">
                        <button
                            className="delete"
                            onclick="confirmBoard('삭제', 'delete','<?= $_GET['boardId'] ?>')"
                        >
                            삭제하기
                        </button>
                        <button
                            className="modify"
                            onclick="confirmBoard('수정', 'modify','<?= $_GET['boardId'] ?>')"
                        >
                            수정하기
                        </button>
                        <button className="good">추천하기</button>
                    </div>
                </div>
            </div>

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

            <div className="boxStyle roundCorner shaDow" id="view_comment">
                <h4>
                    후기 <span id="commentCount"></span>
                </h4>
                <ul className="review_wrap">
                    <li>
                        <div className="review_text">
                            <strong className="textCut"></strong>
                            <p></p>
                            <Link
                                to={"/"}
                                className="modify"
                                data-commentid="<?= $comment['commentId'] ?>"
                                data-memberid="<?= $comment['myMemberId'] ?>"
                            >
                                수정
                            </Link>
                            <Link
                                to={"/"}
                                className="delete"
                                data-commentid="<?= $comment['commentId'] ?>"
                                data-memberid="<?= $comment['myMemberId'] ?>"
                            >
                                삭제
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>

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
                        <Link to=" board_view.php?boardId=<?= $board['boardId'] ?>&page=<?= $pageNumber ?>">
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
                                <Link to="board_view.php?boardId={$boardId}">
                                    &lt;
                                </Link>
                            </li>

                            <li className="$active">
                                <Link to="board_view.php?boardId={$boardId}&page={$i}">
                                    $i
                                </Link>
                            </li>
                            <li className="next">
                                <Link to="board_view.php?boardId={$boardId}={$nextPage}">
                                    &gt;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default View;
