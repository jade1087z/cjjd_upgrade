import axios from "axios";
import { Post } from "../../../interface/post/postInterface";

interface PostResponse {
    postList: Post[];
}

export const bestPost = async (): Promise<Post[]> => {
    return await axios
        .get<PostResponse>("/api/post/bestpost")
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
};

export default bestPost