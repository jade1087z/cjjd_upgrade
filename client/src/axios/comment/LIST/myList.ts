import axios from "axios"
import { commentResponse } from "../../../interface/post/commentInterface";

interface commentListparmas {
    params: number | string | undefined,
    page: number, 
    type?: string
} 
export const myCommentList = async ({params, page, type}:commentListparmas) => {
    return await axios
    .get<commentResponse>(`/api/comment/myComment/${params}?page=${page}`)
    .then((res) => {
        if (res.status === 200) {
            return res.data;
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

export default myCommentList