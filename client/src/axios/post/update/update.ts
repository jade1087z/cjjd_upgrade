import axios from "axios";

export const update = async (e: React.MouseEvent, title: string, contents: string, params: number | string | undefined) => {
    e.preventDefault();


    if (window.confirm('게시글을 수정하시겠습니까?')) {
        try {
            let body = {
                boardTitle: title,
                boardContents: contents
            }
            const result = await axios.patch(`/api/post/update/${params}`, body)
            if (result.status === 200) {
                alert('수정이 완료되었습니다.')
                window.location.href = `/view/${params}`
            } else {
                alert('게시글 수정에 실패하였습니다.');
                window.location.href = `/view/${params}`
            }
        }
        catch (error) {
            if (error.response && error.response.status === 403) {
                console.error(error);
                alert('게시글 삭제 권한이 없습니다.')
            } else {
                alert('알 수 없는 에러가 발생했습니다. 다시 시도해주세요.');
            }
        }
    }



}
export default update