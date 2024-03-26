import React from 'react'

interface MoreCommentProps {
    noMore: boolean;
    setNomore: (arg: boolean) => void;
    page: number;
    setPage: (arg: number) => void;
}

const MoreComment: React.FC<MoreCommentProps> = ({ noMore, setNomore, page, setPage }) => {
    
    let newPage = page + 1;
    const resetComment = () => {
        setNomore(false);
        setPage(0)
    }
    const moreBtn = () => {
        newPage = page + 1;
        if (noMore) { newPage = 0; }
        setPage(newPage)
    }

    return (
        <div className="moreWrap">
            {noMore ?
                (<button className="commentMore" onClick={() => resetComment()}>간략히 보기</button>)
                :
                (<button className="commentMore" onClick={() => moreBtn()}>댓글 더보기</button>)
            }
        </div>
    )
}

export default MoreComment