import axios from "axios";


interface PrevPost {
    boardId: number;
    myMemberId: number;
    boardCategory: string;
    boardTitle: string;
    boardContents: string;
    boardAuthor: string;
    boardView: number;
    boardLike: number;
    boardComment: number;
    boardImgFile: string | null;
    boardImgSize: string | null;
    boardDelete: number;
    regTime: Date | string;
}



export const goodBtn = async (e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLButtonElement>,
    params: number | string | undefined,
    btnLike: boolean,
    setBtnLike: (liked: boolean) => void,
    setPost: (post: PrevPost) => void
)=> {


    e.preventDefault()
    let body = {
        myMemberId: 1,
        isLiked: btnLike
    }
    console.log('clcik')
    await axios.post<{success: boolean, post: PrevPost}>(`/api/post/boardLike/${params}`, body).then((res) => {
        if (res.data.success) {
            setBtnLike(!btnLike)
            setPost({
                ...res.data.post,
                boardLike: btnLike ? res.data.post.boardLike - 1 : res.data.post.boardLike + 1
            });

        }
    }).catch((err) => {
        console.log(err)
    })
}
export default goodBtn;