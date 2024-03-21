import axios from "axios";

interface postProps {
    e: React.MouseEvent,
    title: string,
    contents: string,
    myMemberId: Number,
    author: string,
}

export const post = async ({ e, title, contents, myMemberId, author}: postProps) => {
    e.preventDefault();
    if (window.confirm("게시글을 업로드할까요?")) {
        console.log(contents)

        const body = {boardTitle: title, boardContents: contents, boardAuthor: author }
        await axios
            .post(`/api/post/write/${myMemberId}`, body)
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