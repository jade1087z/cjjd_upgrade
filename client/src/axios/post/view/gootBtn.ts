import axios from "axios";
import { format } from "date-fns";
import { Post } from "../../../interface/post/postInterface";

interface btnProps {
    e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLButtonElement>,
    params: number | string | undefined,
    btnLike: boolean,
    setBtnLike: (liked: boolean) => void,
    setPost: (post: Post) => void,
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
        await axios.post<{ success: boolean, post: Post }>(`/api/post/boardLike/${params}`, body).then((res) => {
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