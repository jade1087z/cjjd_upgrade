import React, { useState } from 'react'
import commentWrite from '../../axios/comment/post/commentWrite';

interface commentWriteProps {
    myMemberId: Number,
    params: number | string | undefined,
    setCommentUpdate: (arg: boolean) => void,
    type: string;
}

const CmmentWrite:React.FC<commentWriteProps> = ({myMemberId, params, setCommentUpdate, type}) => {

    const [contents, setContents] = useState<string>('');
    
    return (
        <div className="boxStyle roundCorner shaDow">
            <h4>댓글 작성하기</h4>
            <div className="review_add">
                <textarea className="scrollStyle" placeholder="자유롭게 의견을 나눠보세요." 
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContents(e.currentTarget.value)} value={contents}></textarea>
                <button type="button" onClick={(e:React.MouseEvent) => { commentWrite({e, contents, setContents, myMemberId, params, setCommentUpdate, type}); setContents(''); }}>작성하기</button>
            </div>
        </div>
    )
}

export default CmmentWrite