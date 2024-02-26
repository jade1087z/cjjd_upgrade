import React, { FC } from "react";
import { Link } from "react-router-dom";

const openTab = (tabId: string) => {
    
}

const Mypage: FC = () => {
    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <div className="tab-menu">
                    <button
                        className="tab-button activity"
                        onClick={() => openTab('mypage_main')}
                    >
                        마이페이지
                    </button>
                    <button
                        className="tab-button"
                        onClick={() => openTab('mypage_diary')}
                    >
                        일기
                    </button>
                    <button
                        className="tab-button"
                        onClick={() => openTab('mypage_activity')}
                    >
                        내 활동
                    </button>
                    <button
                        className="tab-button right"
                        onClick={() => openTab('mypage_review')}
                    >
                        리뷰
                    </button>
                </div>

                <div id="mypage_main" className="tab-content">
                    <div className="main_box">
                        <div className="header_img">
                            <img src="../assets/img/mypage_header.jpg" alt="" />
                        </div>
                        <div className="profile_box">
                            <div className="profile_img">
                                <img src="../assets/img/profile.png" alt="" />
                            </div>
                            <div className="profile_text">
                                <div className="youNick">
                                    <h2>닉네임</h2>
                                </div>
                                <div className="youId">
                                    <span>@abcdef_01234</span>
                                </div>
                                <div className="youemail">
                                    <span>12345890@naver.com</span>
                                </div>
                            </div>
                            <div className="profile_modify">
                                <ul>
                                    <li>
                                        <Link to="profilemodify.php">
                                            프로필 수정하기
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <button id="not_join">회원탈퇴</button>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link to="passmodify.php">
                                            비밀번호 수정
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="mypage_diary" className="tab-content">
                    <div className="today_diary">
                        <h2>12월 32일</h2>
                        <div className="today_photo">
                            <img src="../assets/img/diary.jpg" alt="" />
                        </div>
                        <div className="today_write">
                            <span>
                                대충 내용이 들어가는 자리대충 내용이 들어가는
                                자리대충 내용이 들어가는 대충 내용이 들어가는
                                자리대충 내용이 들어가는 자리대충 내용이
                                들어가는 대충 내용이 들어가는 자리대충 내용이
                                들어가는 자리대충 내용이 들어가는 대충 내용이
                                들어가는 자리대충 내용이 들어가는 자리대충
                                내용이 들어가는 대충 내용이 들어가는 자리대충
                                내용이 들어가는 자리대충 내용이 들어가는
                            </span>
                        </div>
                    </div>
                    <Link to="diary_write.html" className="wirte_button">
                        <span>글쓰기</span>
                    </Link>
                    <div className="board_page_option">
                        <div className="board_pages">
                            <ul className="pages_list">
                                <li className="first">
                                    <Link to="#">&lt;&lt;</Link>
                                </li>
                                <li className="prev">
                                    <Link to="#">&lt;</Link>
                                </li>
                                <li className="active">
                                    <Link to="#">1</Link>
                                </li>
                                <li>
                                    <Link to="#">2</Link>
                                </li>
                                <li>
                                    <Link to="#">3</Link>
                                </li>
                                <li>
                                    <Link to="#">4</Link>
                                </li>
                                <li>
                                    <Link to="#">5</Link>
                                </li>
                                <li className="next">
                                    <Link to="#">&gt;</Link>
                                </li>
                                <li className="last">
                                    <Link to="#">&gt;&gt;</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    id="mypage_activity"
                    className="tab-content mypage_activity"
                >
                    <div>
                        <div className="my_board">
                            <h2>내 게시글</h2>
                            <div className="my_board_table">
                                <table>
                                    <colgroup>
                                        <col style={{ width: "100%" }} />
                                    </colgroup>
                                    <tr>
                                        <th>내용</th>
                                    </tr>
                                    <tr>
                                        <td>이것은 첫 번째 내용입니다.</td>
                                    </tr>
                                    <tr>
                                        <td>이것은 두 번째 내용입니다.</td>
                                    </tr>
                                    <tr>
                                        <td>이것은 첫 번째 내용입니다.</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="board_page_option">
                                <div className="board_pages">
                                    <ul className="pages_list">
                                        <li className="first">
                                            <Link to="#">&lt;&lt;</Link>
                                        </li>
                                        <li className="prev">
                                            <Link to="#">&lt;</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="#">1</Link>
                                        </li>
                                        <li>
                                            <Link to="#">2</Link>
                                        </li>
                                        <li>
                                            <Link to="#">3</Link>
                                        </li>
                                        <li className="next">
                                            <Link to="#">&gt;</Link>
                                        </li>
                                        <li className="last">
                                            <Link to="#">&gt;&gt;</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="my_comment">
                            <h2>내 댓글</h2>
                            <div className="my_comment_table">
                                <table>
                                    <colgroup>
                                        <col style={{ width: "20%" }} />
                                        <col />
                                    </colgroup>
                                    <tr>
                                        <th>제목</th>
                                        <th>내용</th>
                                    </tr>
                                    <tr>
                                        <td>제목 1</td>
                                        <td>이것은 첫 번째 내용입니다.</td>
                                    </tr>
                                    <tr>
                                        <td>제목 2</td>
                                        <td>이것은 두 번째 내용입니다.</td>
                                    </tr>
                                </table>
                            </div>
                            <div className="board_page_option">
                                <div className="board_pages">
                                    <ul className="pages_list">
                                        <li className="first">
                                            <Link to="#">&lt;&lt;</Link>
                                        </li>
                                        <li className="prev">
                                            <Link to="#">&lt;</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="#">1</Link>
                                        </li>
                                        <li>
                                            <Link to="#">2</Link>
                                        </li>
                                        <li>
                                            <Link to="#">3</Link>
                                        </li>
                                        <li className="next">
                                            <Link to="#">&gt;</Link>
                                        </li>
                                        <li className="last">
                                            <Link to="#">&gt;&gt;</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="mypage_review" className="tab-content">
                    <div className="my_review">
                        <div className="my_review_table">
                            <table>
                                <colgroup>
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "20%" }} />
                                    <col style={{ width: "50%" }} />
                                    <col style={{ width: "10%" }} />
                                </colgroup>
                                <tr>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>review</th>
                                    <th>Date</th>
                                </tr>
                                <tr>
                                    <td>
                                        <img
                                            src="../assets/img/Rectangle.jpg"
                                            alt=""
                                        />
                                    </td>
                                    <td>정말로 맛있는 술</td>
                                    <td className="text">
                                        적당한 리뷰 내용 적당한 리뷰 내용 적당한
                                        리뷰 내용적당한 리뷰 내용 적당한 리뷰
                                        내용적당한 리뷰 내용
                                    </td>
                                    <td>10월 21일</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img
                                            src="../assets/img/Rectangle.jpg"
                                            alt=""
                                        />
                                    </td>
                                    <td>술 1</td>
                                    <td className="text">
                                        이것은 첫 번째 내용입니다.
                                    </td>
                                    <td>10월 21일</td>
                                </tr>
                                <tr>
                                    <td>
                                        <img
                                            src="../assets/img/Rectangle.jpg"
                                            alt=""
                                        />
                                    </td>
                                    <td>술 1</td>
                                    <td className="text">
                                        이것은 첫 번째 내용입니다.
                                    </td>
                                    <td>10월 21일</td>
                                </tr>
                            </table>
                            <div className="board_page_option">
                                <div className="board_pages">
                                    <ul className="pages_list">
                                        <li className="first">
                                            <Link to="#">&lt;&lt;</Link>
                                        </li>
                                        <li className="prev">
                                            <Link to="#">&lt;</Link>
                                        </li>
                                        <li className="active">
                                            <Link to="#">1</Link>
                                        </li>
                                        <li>
                                            <Link to="#">2</Link>
                                        </li>
                                        <li>
                                            <Link to="#">3</Link>
                                        </li>
                                        <li className="next">
                                            <Link to="#">&gt;</Link>
                                        </li>
                                        <li className="last">
                                            <Link to="#">&gt;&gt;</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Mypage;
