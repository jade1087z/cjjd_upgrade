import axios from "axios";
import { Post } from "../../../interface/post/postInterface";

interface PostResponse {
    postList: Post[];
}
export const postAllpage = async (page: number): Promise<Post[]> => {
    
    return await axios
    .get<PostResponse>(`/api/post/pagelist?page=${page}`)
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

export default postAllpage