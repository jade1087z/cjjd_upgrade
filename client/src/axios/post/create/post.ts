import axios from "axios";
import { ImageFile } from "../../../interface/post/ImageFile.interface";

interface postProps {
    e: React.MouseEvent,
    title: string,
    contents: string,
    myMemberId: Number,
    author: string,
    imgFile: ImageFile[] | string | null,
    imgRange: number[] | number | null
}

export const post = async ({ e, title, contents, myMemberId, author, imgFile, imgRange }: postProps) => {
    e.preventDefault();
    if (window.confirm("게시글을 업로드할까요?")) {

        console.log(imgFile)
        const body = new FormData();
        if (imgFile && Array.isArray(imgFile)) {
            imgFile.forEach(file => {
                if (file.file && file.file instanceof File) body.append('imgFile', file.file, file.file.name);
                body.append('imgFileId', file.id);

            })
            body.append('imgRange', imgRange?.toString())
        }
        body.append('boardTitle', title);
        body.append('boardContents', contents);
        body.append('boardAuthor', author);

        await axios
            .post(`/api/post/write/${myMemberId}`, body, { headers: { 'Content-Type': 'multipart/form-data', } })
            .then((res) => {
                if (res.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    // window.location.href= '/community'
                } else {
                    console.log("axios false");
                }
            })
            .catch((err) => {
                console.log(err, "aixos ERR");
            });
    }
};
export default post