import axios from "axios"

interface commentWriteProps {
    e: React.MouseEvent;
    contents: String;
    setContents: (contents: string) => void,
    myMemberId: Number;
    params: number | string | undefined,
    setCommentUpdate: (arg: boolean) => void,
    type: string
}

export const commentWrite = async ({ e, contents, setContents, myMemberId, params, setCommentUpdate, type }: commentWriteProps) => {

    if (window.confirm('댓글을 작성하겠습니까?')) {
        if (myMemberId) {
            if (contents) {
                try {
                    let body = {
                        contents: contents,
                        myMemberId: myMemberId,
                        type:type
                    }
                    const result = await axios.post(`/api/comment/write/${params}`, body)
                    if (result.status === 200) {
                        alert('댓글 작성에 성공했습니다.')
                        setContents('')
                        setCommentUpdate(true)
                    }
                } catch (error) {
                    alert('댓글 작성에 실패했습니다.')
                }
            } else {
                alert('작성할 댓글을 입력해주세요.')
            }
        } else {
            alert('댓글 작성은 회원만 가능합니다.')
        }
    }
}
export default commentWrite