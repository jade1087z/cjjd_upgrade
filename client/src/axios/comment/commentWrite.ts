import axios from "axios"

interface commentWriteProps {
    e: React.MouseEvent;
    contents: String;
    myMemberId: Number;
    params: number | string | undefined,
    setCommentUpdate: (arg: boolean) => void
}

export const commentWrite = async ({ e, contents, myMemberId, params, setCommentUpdate }: commentWriteProps) => {

    if (window.confirm('댓글을 작성하겠습니까?')) {
        if (myMemberId) {
            try {
                let body = {
                    contents: contents,
                    myMemberId: myMemberId
                }
                const result = await axios.post(`/api/comment/write/${params}`, body)
                if (result.status === 200) {
                    alert('댓글 작성에 성공했습니다.')
                    setCommentUpdate(true)
                }
            } catch (error) {
                alert('댓글 작성에 실패했습니다.')
            }
        } else {
            alert ('댓글 작성은 회원만 가능합니다.')
        }
    }
}
export default commentWrite