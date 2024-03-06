import axios from "axios"

export const updateCheck = async (e: React.MouseEvent, params: string | number | undefined, myMemberId: number) => {
    e.preventDefault()

    if (window.confirm('작성글을 수정하시겠습니까?')) {
        try {
            const result = await axios.get(`/api/post/check/${params}`, { params: { myMemberId } })
            if (result.status === 200) window.location.href = `/update/${params}`
        } catch (error) {

            if (error.response && error.response.status === 403) {
                console.error(error);
                alert('게시글 수정 권한이 없습니다.')
            } else {
                alert('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.');
            }
        }
    }
}

export default updateCheck