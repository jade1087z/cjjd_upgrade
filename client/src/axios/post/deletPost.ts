import axios from "axios"

export const deletePost = async (e: React.MouseEvent, params: string | number | undefined, myMemberId: Number) => {
    e.preventDefault()
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
        if (myMemberId) {

            try {
                const result = await axios.delete(`/api/post/delete/${params}`, { params: { myMemberId } })
                if (result.status === 200) {
                    alert('게시글이 삭제되었습니다.')
                    window.location.href = '/community'
                } else {
                    alert('게시글 삭제 권한이 없습니다.')
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error(error);
                    alert('게시글 삭제 권한이 없습니다.')
                } else {
                    alert('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.');
                }
            }
        } else {
            alert('로그인을 해주세요.')
        }
    }
}

export default deletePost