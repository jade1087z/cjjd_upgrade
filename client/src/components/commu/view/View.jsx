import React from "react";

const View = () => {
    return (
        <>
            <div class="board_view boxStyle roundCorner shaDow">
                <h4>
                    <a href="board.php">자유게시판</a>
                </h4>

                <div class="view_wrap">
                    <div class="view_top">
                        <h5> f</h5>
                    </div>

                    <div class="view_box">
                        <div class="user_info not_user">
                            <div class="user_info_box">
                                <a href="board_member_info.php?boardId=<?= $boardId ?>">
                                    <p>
                                        <em></em>님의 게시글 더보기
                                    </p>
                                </a>
                            </div>
                        </div>
                        <div class="view_info">
                            <div class="info_list">
                                <div class="view_num boardRegtime">
                                    <em>black</em>
                                </div>
                                <i class="fa-solid fa-heart <?= $isLiked ?> >"></i>
                                <div class="view_num boardLike">
                                    추천수: <em></em>
                                </div>
                                <div class="view_num">
                                    조회수: <em></em>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="board_desc">
                    <div class="board_detail">
                        <div class="board_desc_img">
                            <img
                                src="../assets/DBIMG/<?= $boardInfo['boardImgFile'] ?>"
                                alt="<?= $boardInfo['boaldTitle'] ?>"
                            />
                        </div>
                        <em class="scrollStyle"></em>
                    </div>
                </div>
                <div class="comment_summary">
                    <div class="button_list">
                        <button
                            class="delete"
                            onclick="confirmBoard('삭제', 'delete','<?= $_GET['boardId'] ?>')"
                        >
                            삭제하기
                        </button>
                        <button
                            class="modify"
                            onclick="confirmBoard('수정', 'modify','<?= $_GET['boardId'] ?>')"
                        >
                            수정하기
                        </button>
                        <button class="good">추천하기</button>
                    </div>
                </div>
            </div>

            <div class="boxStyle roundCorner shaDow">
                <h4>
                    후기 <span>0</span>
                </h4>
                <ul class="review_wrap">
                    <li>
                        <div class="review_text">
                            <span>아직 작성 된 후기가 없습니다.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="boxStyle roundCorner shaDow" id="view_comment">
                <h4>
                    후기 <span id="commentCount"></span>
                </h4>
                <ul class="review_wrap">
                    <li>
                        <div class="review_text">
                            <strong class="textCut"></strong>
                            <p></p>
                            <a
                                href="#"
                                class="modify"
                                data-commentid="<?= $comment['commentId'] ?>"
                                data-memberid="<?= $comment['myMemberId'] ?>"
                            >
                                수정
                            </a>
                            <a
                                href="#"
                                class="delete"
                                data-commentid="<?= $comment['commentId'] ?>"
                                data-memberid="<?= $comment['myMemberId'] ?>"
                            >
                                삭제
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="boxStyle roundCorner shaDow">
                <h4>후기 작성하기</h4>
                <div class="review_add">
                    <textarea
                        class="scrollStyle"
                        name="review_write"
                        id="review_write"
                        placeholder="자유롭게 의견을 나눠보세요."
                    ></textarea>
                    <button type="button" id="commentWriteBtn">
                        작성하기
                    </button>
                </div>
            </div>

            <div class="boxStyle roundCorner shaDow">
                <ul class="board_w100">
                    <li class="<?= $thisId ?>">
                        <a href=" board_view.php?boardId=<?= $board['boardId'] ?>&page=<?= $pageNumber ?>">
                            <div class="board_info">
                                <div class="board_title textCut"></div>
                                <div class="board_author textCut"></div>
                                <div class="board_date"></div>
                                <div class="board_view">
                                    <span></span>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="board_page_option">
                    <div class="board_pages">
                        <ul class="pages_list">
                            <li class="prev">
                                <a href="board_view.php?boardId={$boardId}">
                                    &lt;
                                </a>
                            </li>

                            <li class="$active">
                                <a href="board_view.php?boardId={$boardId}&page={$i}">
                                    $i
                                </a>
                            </li>
                            <li class="next">
                                <a href="board_view.php?boardId={$boardId}={$nextPage}">
                                    &gt;
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default View;
