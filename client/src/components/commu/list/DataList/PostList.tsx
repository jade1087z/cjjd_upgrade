import React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../../../../interface/post/postInterface';
import { InfiniteData } from 'react-query';
interface postListProps {
    data: InfiniteData<Post[]>;
}
const PostList:React.FC<postListProps> = ({data}) => {
    const postlist = data?.pages.flatMap(page => page)

    return (
        <ul className="board_w100">
            {postlist && postlist.map((post, key) => (
                <li key={key}>
                    <Link to={`/view/${post.boardId}`}>
                        <div className="board_info">
                            <div className="board_title textCut">
                                {post.boardTitle}
                            </div>
                            <div className="board_author textCut">
                                {post.boardAuthor}
                            </div>
                            <div className="board_date">
                                {post.regTime instanceof Date ? post.regTime.toISOString() : post.regTime}
                            </div>
                            <div className="board_view">
                                {post.boardView}
                            </div>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default PostList