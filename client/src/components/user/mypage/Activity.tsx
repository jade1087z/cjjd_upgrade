import React from 'react'
import { Link } from 'react-router-dom'

const Activity = () => {
    return (
        <div className="tab-content mypage_activity">
            <div className='flexWrap'>
                <div className="my_board">
                    <h2>내 게시글</h2>
                    <div className="my_board_table">
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
                        </table>
                    </div>
                </div>
                <div className="my_comment">
                    <h2>내 댓글</h2>
                    <div className="my_comment_table">
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
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Activity