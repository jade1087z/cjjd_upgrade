import React from 'react'
import { Link } from 'react-router-dom'

const Diary = () => {
  return (
    <div id="mypage_diary" className="tab-content mypage_diary">
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
  )
}

export default Diary