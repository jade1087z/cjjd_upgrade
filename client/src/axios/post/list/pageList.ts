import axios from "axios";
import { Post } from "../../../interface/post/postInterface";
import { format } from "date-fns";

interface PostResponse {
    postList: Post[];
}
// export const postAllpage = async (page: number): Promise<Post[]> => {
    
//     return await axios
//     .get<PostResponse>(`/api/post/pagelist?page=${page}`)
//     .then((res) => {
//         if (res.status === 200) {
//             return res.data.postList;
//         } else {
//             console.log("else error", res);
//             return [];
//         }
//     })
//     .catch((err) => {
//         console.log("Axios error", err); // Axios 오류 출력
//         return [];
//     });
// }
const postAllpage = async ({ pageParam = 1 }): Promise<Post[]> => {
    const response = await axios.get(`/api/post/pagelist?page=${pageParam}`);
    console.log(pageParam)
    if (response.status === 200) {
        return response.data.postList.map(post => ({
            ...post,
            regTime: format(new Date(), 'MM,dd')
        }));;
    } else {
        console.log("else error", response);
        return [];
    }
};
export default postAllpage