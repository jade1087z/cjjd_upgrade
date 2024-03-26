import axios from "axios"
import { comment } from "../../interface/post/commentInterface";

interface commentListparmas {
    params: number | string | undefined,
    page: number, 
    type: string
} 
export const commentList = async ({params, page, type}:commentListparmas) => {
    try {
        const result = await axios.get(`/api/comment/list/${params}`, {params: {page, type}})
        // if(result.status === 200) {
        //     setComment(result.data.result)
        //     setTotal(result.data.total)
        // } 
        // return result.data.success
        if(result.status === 200) return result.data
    } catch (err) {
        console.log(err)
        return null;
    }
}

export default commentList