import axios from "axios";
import { format } from "date-fns";


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

interface btnProps {
    e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLButtonElement>,
    params: number | string | undefined,
    btnLike: boolean,
    setBtnLike: (liked: boolean) => void,
    setPost: (post: PrevPost) => void,
    myMemberId: number
}


export const goodBtn = async ({ e, params, btnLike, setBtnLike, setPost, myMemberId }: btnProps) => {

    e.preventDefault()
    let body = {
        myMemberId: myMemberId,
        isLiked: btnLike
    }
    console.log(myMemberId, 'myMemberId')
    if (myMemberId) {
        await axios.post<{ success: boolean, post: PrevPost }>(`/api/post/boardLike/${params}`, body).then((res) => {
            if (res.data.success) {
                setBtnLike(!btnLike)
                const postData = {
                    ...res.data.post,
                    regTime: format(new Date(res.data.post.regTime), "MM.dd"),
                }
                setPost(postData);

            }
        }).catch((err) => {
            console.log(err)
        })
    } else {
        alert ('로그인 후 이용해주세요.')
    }
     

}
export default goodBtn;