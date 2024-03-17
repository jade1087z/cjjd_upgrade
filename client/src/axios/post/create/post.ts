import axios from "axios";
import { ImageFile } from "../../../interface/post/ImageFile.interface";

interface postProps {
    e: React.MouseEvent,
    title: string,
    contents: string,
    myMemberId: Number,
    author: string,
    imgFile: ImageFile
}

async function prepareContentForServer(contents) {
    // const imgRegex = /<img src="data:image\/[^;]+;base64,[^"]+"/g;
    // let match;
    // let imagesToUpload = []

    // while ((match = imgRegex.exec(contents)) !== null) {
    //     imagesToUpload.push(match[0]);
    // }

    // for (let base64Image of imagesToUpload) {
    //     const base64Data = base64Image.replace(/<img src="|"/g, '');
        
    // }
    // contents에서 모든 <img> 태그를 빈 문자열로 대체
    const imgRegex = /<img src="data:image\/[^;]+;base64,[^"]+">/g;
    const updatedContents = contents.replace(imgRegex, '');
    return updatedContents;
}


export const post = async ({e, title, contents, myMemberId, author, imgFile}:postProps) => {
    e.preventDefault();
    if (window.confirm("게시글을 업로드할까요?")) {
        
        console.log(imgFile)
        const body = new FormData();
        if (imgFile && imgFile instanceof File) {
            body.append('imgFile', imgFile, imgFile.name);
        }
        body.append('boardTitle', title);
        body.append('boardContents', await prepareContentForServer(contents));
        body.append('boardAuthor', author);
        
        console.log(body)
        
        await axios
            .post(`/api/post/write/${myMemberId}`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }  
            })
            .then((res) => {
                if (res.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    window.location.href= '/community'
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