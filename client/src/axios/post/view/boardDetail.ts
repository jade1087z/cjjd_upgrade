import axios from "axios";
import { Post } from "../../../interface/post/postInterface";

interface boardDetailProps {
    params: number | string | undefined,
    setBtnLike: (liked: boolean) => void,
    myMemberId: number | null
}

export const boardDetail = async ({params, setBtnLike, myMemberId}: boardDetailProps) => {
    return await axios
        .get<{success: boolean; isLiked: boolean; post: Post;}>(`/api/post/view/${params}`, {params: {myMemberId}})
        .then((res) => {
            if (res.data.success) {
                setBtnLike(res.data.isLiked)
                return res.data.post;
            } else {
                console.log("axios fail");
                return undefined
            }
        })
        .catch((err) => {
            console.log(err);
            return undefined
        });
};
export default boardDetail;
