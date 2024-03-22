import axios from "axios";

interface updateCommentProps {
    e: React.MouseEvent;
    commentId: Number;
    msg: string;
    msgUpdate: boolean[];
    setMsgUpdate: (arg: boolean[]) => void;
    key: number;
}

export const updateComment = async ({ e, commentId, msg, msgUpdate, setMsgUpdate, key }: updateCommentProps) => {
    e.preventDefault()
    let body = { msg: msg }
    if (window.confirm('댓글을 수정하시겠습니까?')) {
        if (msg) {
            try {
                const result = await axios.patch(`/api/comment/update/${commentId}`, body)
                if (result.status === 200) {
                    alert('수정이 완료되었습니다.')
                    const newMsgUpdate = [...msgUpdate];
                    newMsgUpdate[key] = false;
                    setMsgUpdate(newMsgUpdate)

                } else {
                    alert('댓글 수정에 실패하였습니다.');
                }
            }
            catch (error) {
                alert('댓글 수정에 실패하였습니다.');
            }
        } else {
            alert('수정할 내용을 입력해주세요.')
        }
    }
}
export default updateComment