import axios from "axios";
import { ImageFile } from "../../../interface/post/ImageFile.interface";
import { prepareContentForServer } from "../prepareContentForServer";

interface updateProps {
    e: React.MouseEvent,
    title: string,
    contents: string,
    params: number | string | undefined,
    newUpdateImgFile: ImageFile | string | null,
    newRange: number [],
}

export const update = async ({ e, title, contents, newUpdateImgFile, newRange, params }) => {
    e.preventDefault();
    

    console.log(newRange)

    if (window.confirm('게시글을 수정하시겠습니까?')) {
        try {

            const body = new FormData();
            if (newUpdateImgFile && newUpdateImgFile instanceof File) {
                body.append('imgFile', newUpdateImgFile, newUpdateImgFile.name);
                body.append('newRange', newRange.toString())
            }
            body.append('boardTitle', title);
            body.append('boardContents', contents);
            console.log(body)

            const result = await axios.patch(`/api/post/update/${params}`, body, {headers: {'Content-Type': 'multipart/form-data',}})
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