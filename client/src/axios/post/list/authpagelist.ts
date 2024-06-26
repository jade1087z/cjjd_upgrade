import axios from "axios";
import { Post } from "../../../interface/post/postInterface";
import { format } from "date-fns";

interface PostResponse {
    postList: Post[];
}
interface authpagelistProps {
    pageParam?: number;
    params: string | undefined;
}
export const authpagelist = async ({ pageParam = 1, params }: authpagelistProps): Promise<Post[]> => {

    return await axios
        .get<PostResponse>(`/api/post/authpagelist/${params}?page=${pageParam}`)
        .then((res) => {
            if (res.status === 200) {
                return res.data.postList.map(post => ({
                    ...post,
                    regTime: format(new Date(), 'MM,dd')
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
}

export default authpagelist