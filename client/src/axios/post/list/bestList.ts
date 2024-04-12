import axios from "axios";
import { Post } from "../../../interface/post/postInterface";
import { format } from 'date-fns';
interface PostResponse {
    postList: Post[];
}

export const bestPost = async (): Promise<Post[]> => {
    return await axios
        .get<PostResponse>("/api/post/bestpost")
        .then((res) => {
            if (res.status === 200) {
                console.log('i am bestPost norecent')
                return res.data.postList.map(post => ({
                    ...post, 
                    regTime: format(new Date(post.regTime), 'MM,dd')
                }));
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