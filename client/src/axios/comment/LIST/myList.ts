import axios from "axios"

interface commentListparmas {
    params: number | string | undefined,
    page: number, 
    type?: string
} 
export const myCommentList = async ({params, page, type}:commentListparmas) => {
    try {
        const result = await axios.get(`/api/comment/myList/${params}`)
        if(result.status === 200) return result.data
    } catch (err) {
        console.log(err)
        return null;
    }
}

export default myCommentList