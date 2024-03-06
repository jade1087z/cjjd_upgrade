import axios from "axios";

interface updateUpdateCommentProps {
    e: React.MouseEvent;
    params: number | string | undefined;
    myMemberId: Number;
    commentId: Number;
    msgUpdate: boolean[];
    setMsgUpdate: (arg: boolean[]) => void;
    key: number;
}

export const checkUpdateComment = async ({ e, params, myMemberId, commentId, msgUpdate, setMsgUpdate, key }: updateUpdateCommentProps) => {
    e.preventDefault()

    if (window.confirm('댓글을 수정하시겠습니까?')) {
        if (myMemberId) {

            try {
                const result = await axios.get(`/api/comment/check/${params}`, { params: { myMemberId, commentId } })
                if (result.status === 200) {
                    const newMsgUpdate = [...msgUpdate];
                    newMsgUpdate[key] = true;
                    setMsgUpdate(newMsgUpdate)
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error(error);
                    alert('댓글을 수정 권한이 없습니다.')
                } else {
                    alert('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.');
                }
            }
        } else {
            alert('댓글 수정은 회원만 가능합니다.');
        }
    }
}

export default checkUpdateComment