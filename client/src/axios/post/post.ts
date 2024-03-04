import axios from "axios";

export const post = async (e: React.MouseEvent, category: string, title: string, contents: string, navigate: any, myMemberId, author) => {
    e.preventDefault();
    if (window.confirm("게시글을 업로드할까요?")) {
        console.log(category);
        const body = {
            myMemberId: myMemberId,
            boardCategory: category,
            boardTitle: title,
            boardContents: contents,
            boardAuthor: author
        };
        await axios
            .post("/api/post/write", body)
            .then((res) => {
                if (res.data.success) {
                    alert("글 작성이 완료되었습니다.");
                    navigate("/community");
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