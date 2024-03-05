import axios from "axios"

export const deletePost = async (e: React.MouseEvent, params: string | number | undefined , myMemberId: Number) => {
    e.preventDefault()
    if(window.confirm('게시글을 삭제하시겠습니까?')){
        const result = await axios.delete(`/api/post/delete/${params}`, {params: {myMemberId}})
        if(result.status === 200) {
            alert('게시글이 삭제되었습니다.')
            window.location.href = '/commu'
        } else {
            alert('게시글 삭제 권한이 없습니다.')
        }
    }

}
export default deletePost