import React from 'react'
import { Link } from 'react-router-dom'

const Review = () => {
    return (
        <div className="tab-content">
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
    )
}

export default Review