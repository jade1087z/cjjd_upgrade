import axios from "axios";

interface deleteCommentProps {
    e: React.MouseEvent;
    params: number | string | undefined,
    myMemberId: Number;
    commentId: Number;
    commentUpdate: boolean;
    setCommentUpdate: (update: boolean) => void;
}
export const deleteComment = async ({ e, params, myMemberId, commentId, commentUpdate, setCommentUpdate}: deleteCommentProps) => {
    e.preventDefault()
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
        if (myMemberId) {
            try {
                const result = await axios.delete(`/api/comment/delete/${commentId}`, { params: { myMemberId } })
                if (result.status === 200) {
                    alert('댓글이 삭제되었습니다.')
                    setCommentUpdate(!commentUpdate)
                }
            } catch (error) {
                alert('댓글 삭제에 실패했습니다.')
            }
        } else {
            alert('로그인을 해주세요.')
        }
    }
}

export default deleteComment