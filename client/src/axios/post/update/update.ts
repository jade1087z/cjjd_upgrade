import axios from "axios";

export const update = async (e: React.MouseEvent, title: string, contents: string, params:number | string | undefined) => {
    e.preventDefault();
    let body = {
        boardTitle: title,
        boardContents: contents
    }

    if(window.confirm('게시글을 수정하시겠습니까?')) {
        const result = await axios.patch(`/api/post/update/${params}`, body)
        if(result.status === 200) {
            alert('수정이 완료되었습니다.')
            window.location.href = `/view/${params}`
        } else {
            alert('게시글 수정에 실패하였습니다.');
            window.location.href = `/view/${params}`
        }
    }
}
export default update