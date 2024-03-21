import React, { useEffect, useState } from 'react'
import ContentsWrap from '../write/ContentsWrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../reducer/store';
import boardDetail from '../../../axios/post/view/boardDetail';
import { Post, RouteParams } from '../../../interface/post/postInterface';
import update from '../../../axios/post/update/update';
import { cancle } from '../../../axios/post/create/postCancle';
import { ImageFile } from '../../../interface/post/ImageFile.interface';
import { onlyText, prepareContentForServer } from '../../../axios/post/prepareContentForServer';


const PostUpdate: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId;
    const { boardId } = useParams<RouteParams>();
    const params: number | string | undefined = boardId === undefined ? undefined : (isNaN(Number(boardId)) ? boardId : Number(boardId));

    const [btnLike, setBtnLike] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("");
    const [contents, setContents] = useState<string>("");
    
    useEffect(() => {
        let isMounted = true
        const fetchPost = async () => {
            const data: Post | undefined = await boardDetail({params, setBtnLike, myMemberId});
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
                                    
                                    <ContentsWrap title={title} contents={contents} setTitle={setTitle} setContents={setContents} />

                                    <div className="create">
                                        <button className="sideBtn mt50 mr20" onClick={(e) => cancle(e)}>
                                            취소
                                        </button>
                                        <button className="sideBtn mt50 submit" onClick={(e) => update({e, title, contents, params})}>
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