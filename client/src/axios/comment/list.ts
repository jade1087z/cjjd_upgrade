import axios from "axios"
import { comment } from "../../interface/post/commentInterface";

interface commentListparmas {
    params: number | string | undefined,
    page: number, 
    setComment: (comment: comment[]) => void,
    setTotal: (num: number) => void
} 
export const commentList = async ({params, page, setComment, setTotal}:commentListparmas) => {
    try {
        const result = await axios.get(`/api/comment/list/${params}`, {params: {page}})
        if(result.status === 200) {
            setComment(result.data.result)
            setTotal(result.data.total)
        } 
        return result.data.success
    } catch (err) {
        console.log(err)
        return null;
    }
}

export default commentList