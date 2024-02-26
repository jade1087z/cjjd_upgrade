import axios, { AxiosResponse }  from "axios";
import { Post } from "../../../components/commu/interface/postInterface";


export const boardDetail = async(params: number | string | undefined, setBtnLike: (liked: boolean) => void) => {
    return await axios
        .get<{success: boolean; isLiked: boolean; post: Post;}>(`/api/post/view/${params}`)
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
