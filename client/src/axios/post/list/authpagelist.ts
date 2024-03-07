import axios from "axios";
import { Post } from "../../../interface/postInterface";

interface PostResponse {
    postList: Post[];
}
interface authpagelistProps {
    page: number;
    params: string | undefined;
}
export const authpagelist = async ({page, params}:authpagelistProps): Promise<Post[]> => {
    
    return await axios
    .get<PostResponse>(`/api/post/authpagelist/${params}?page=${page}`)
    .then((res) => {
        if (res.status === 200) {
            return res.data.postList;
        } else {
            console.log("else error", res);
            return [];
        }
    })
    .catch((err) => {
        console.log("Axios error", err); // Axios 오류 출력
        return [];
    });
}

export default authpagelist