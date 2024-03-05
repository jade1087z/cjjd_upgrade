import React, { useEffect, useState } from 'react'
import SelectOption3 from '../write/SelectOption3';
import ContentsWrap from '../write/ContentsWrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducer/store';
import boardDetail from '../../../axios/post/view/boardDetail';
import { Post, RouteParams } from '../../../interface/postInterface';
import { format } from "date-fns";
import update from '../../../axios/post/update/update';
import { cancle } from '../../../axios/post/postCancle';


const PostUpdate: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId;
    const { boardId } = useParams<RouteParams>();
    const params: number | string | undefined = boardId === undefined ? undefined : (isNaN(Number(boardId)) ? boardId : Number(boardId));

    const [btnLike, setBtnLike] = useState<boolean>(false)

    const [category, setCategory] = useState<string>("자유게시판");
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string>("");

    useEffect(() => {
        let isMounted = true
        const fetchPost = async () => {
            const data: Post | undefined = await boardDetail(params, setBtnLike, myMemberId);
            if (data && isMounted) {
                setTitle(data.boardTitle);
                setContents(data.boardContents);
            }
        };
        fetchPost();
        return () => {
            isMounted = false
        }
    }, [myMemberId]);


    return (
        <>
            <div className="best_list boxStyle roundCorner shaDow ">
                <div className="board">
                    <div className="board_form">
                        <div className="form">
                            <legend className="blind"></legend>
                            <div className="form_box">
                                <div className="board_title">
                                    <h2>자유게시판</h2>
                                </div>
                                <div className="board_text">
                                    <div className="post">
                                        <SelectOption3
                                            category={category}
                                            setCategory={setCategory}
                                        />
                                        <label htmlFor="boardFile" className="link">이미지를 업로드 해주세요.!!
                                        </label>
                                        <input type="file" accept=".jpg, .jpeg, .png, .gif, .webp" className="link none" />
                                    </div>
                                    <ContentsWrap title={title} contents={contents} setTitle={setTitle} setContents={setContents} />

                                    <div className="create">
                                        <button className="sideBtn mt50 mr20" onClick={(e) => cancle(e)}>
                                            취소
                                        </button>
                                        <button className="sideBtn mt50 submit" onClick={(e) => update(e, title, contents, params)}>
                                            수정 완료
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostUpdate