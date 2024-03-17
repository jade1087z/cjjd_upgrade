import React, { useEffect, useState } from "react";
import commentList from "../../../../axios/comment/list";
import { comment } from "../../../../interface/post/commentInterface";
import updateComment from "../../../../axios/comment/updateComment";
import deleteComment from "../../../../axios/comment/deleteComment";
import checkUpdateComment from "../../../../axios/comment/checkUpdateComment";
import cancleComment from "../../../../axios/comment/cancleComment";

interface areaInterface {
    params: number | string | undefined,
    myMemberId: number,
    commentUpdate: boolean,
    setCommentUpdate: (arg: boolean) => void
}

const CommentArea: React.FC<areaInterface> = ({ params, commentUpdate, myMemberId, setCommentUpdate }) => {
    const [comment, setComment] = useState<comment[]>([]);
    const [msgUpdate, setMsgUpdate] = useState<boolean[]>(new Array(comment.length).fill(false));
    const [msg, setMsg] = useState<string[]>(new Array(comment.length).fill(''));

    useEffect(() => {
        const fetchComment = async () => {
            const result: comment[] = await commentList(params)
            if (result) setComment(result)
        }
        fetchComment();
        return () => {
            setCommentUpdate(false)
        }
    }, [params, commentUpdate])

    
    return (
        <>
            {comment ? (
                <div className="boxStyle roundCorner shaDow">
                    <h4>
                        후기 <span id="commentCount">{comment.length}</span>
                    </h4>
                    <ul className="review_wrap">
                        {comment.map((li, key) => (
                            <li key={key}>
                                <div className="review_text">
                                    {!msgUpdate[key] ? (
                                        <>
                                            <strong className="textCut">{li.commentName}</strong>
                                            <p>{li.commentMsg}</p>
                                            <button className="modify" 
                                            onClick={(e: React.MouseEvent) => checkUpdateComment({ e, params, myMemberId, commentId: li.commentId, msgUpdate, setMsgUpdate, key})}>수정</button>
                                            <button className="delete"
                                             onClick={(e: React.MouseEvent) => deleteComment({ e, params, myMemberId, commentId: li.commentId, commentUpdate, setCommentUpdate })}>삭제</button>
                                        </>
                                    ) : (
                                        <><strong className="textCut">{li.commentName}</strong>
                                            <textarea className="renderingText" cols={20} rows={1} value={msg[key] || li.commentMsg}
                                             onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
                                                const newSetMsg = [...msg];
                                                newSetMsg[key] = e.currentTarget.value;
                                                setMsg(newSetMsg)
                                             }}></textarea>
                                            <button className="modify" 
                                            onClick={(e: React.MouseEvent) => updateComment({ e, commentId: li.commentId, msg: msg[key] || '', msgUpdate, setMsgUpdate, key })}>등록</button>
                                            <button className="delete" 
                                            onClick={(e: React.MouseEvent) => cancleComment({e, msgUpdate, setMsgUpdate, key})}>취소</button></>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="boxStyle roundCorner shaDow">
                    <h4>
                        후기 <span>0</span>
                    </h4>
                    <ul className="review_wrap">
                        <li>
                            <div className="review_text">
                                <span>아직 작성 된 후기가 없습니다.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default CommentArea;
