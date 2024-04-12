import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../../../interface/post/postInterface'
interface datalistInterface {
    data: Post[];
}
const DataList: React.FC<datalistInterface> = ({ data }) => {

    return (
        <ul className="board_w100">
            {data && data.map((post, key) => (
                <li key={key}>
                    <Link to={`/view/${post.boardId}`}>
                        <div className="board_info">
                            <div className="board_title textCut">{post.boardTitle} </div>
                            <div className="board_author textCut">{post.boardAuthor}</div>
                            <div className="board_date">{post.regTime instanceof Date ? post.regTime.toISOString() : post.regTime}</div>
                            <div className="board_view">조회수: {post.boardView}</div>
                            <div className="board_comment">댓글: {post.boardComment}</div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default DataList