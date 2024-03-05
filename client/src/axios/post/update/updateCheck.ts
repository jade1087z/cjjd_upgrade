import axios from "axios"

export const updateCheck = async (e: React.MouseEvent, params: string | number | undefined, myMemberId: number) => {
    e.preventDefault()
    if(window.confirm('작성글을 수정하시겠습니까?')) {
        const result = await axios.get(`/api/post/check/${params}`,{
            params: {myMemberId}
        })
        if(result.status === 200) {
            window.location.href = `/update/${params}`
        } else {
            alert('게시글의 수정 권한이 없습니다.')
        }
    }
}

export default updateCheck