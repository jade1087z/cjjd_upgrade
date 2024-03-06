import axios from "axios";
import { comment } from "../../interface/commentInterface";

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
    if (window.confirm('게시글을 수정하시겠습니까?')) {
        try {
            const result = await axios.patch(`/api/comment/update/${commentId}`, body)
            if (result.status === 200) {
                alert('수정이 완료되었습니다.')
                const newMsgUpdate = [...msgUpdate];
                newMsgUpdate[key] = false;
                setMsgUpdate(newMsgUpdate)
                
            } else {
                alert('게시글 수정에 실패하였습니다.');
            }
        }
        catch (error) {
            alert('게시글 수정에 실패하였습니다.');
        }
    }
}
export default updateComment