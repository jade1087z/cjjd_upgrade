import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 import { postAll} from "../../axios/post/listAll";
import SearchList from "./SearchList";
import { format } from "date-fns";
import { Post } from "../../interface/postInterface";

const Community: React.FC = () => {
    const [postList, setPostList] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPostList = async () => {
            const newPostList: Post[] = await postAll();
            if (newPostList) {
                const formattedPostList = newPostList.map((post) => ({
                    ...post,
                    regTime: format(new Date(post.regTime), "MM.dd"),
                }));
                if (
                    JSON.stringify(postList) !==
                    JSON.stringify(formattedPostList)
                ) {
                    setPostList(formattedPostList);
                }
            }
        };
        console.log(postList);
        fetchPostList();
    }, [postList]);

    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow">
                <h4>자유 게시판</h4>

                <ul className="board_w100">
                    {postList &&
                        postList.map((post, key) => (
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
                                            <span>{post.boardView}</span>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                </ul>

                <div className="board_page_option">
                    <div className="board_pages">
                        <ul className="pages_list">
                            <li className="prev">
                                <Link to="/">
                                    &lt;
                                </Link>
                            </li>
                            <li className="active">
                                <Link to="/">$i</Link>
                            </li>
                            <li className="next">
                                <Link to="/">
                                    &gt;
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <SearchList />
            </div>
        </>
    );
};

export default Community;
