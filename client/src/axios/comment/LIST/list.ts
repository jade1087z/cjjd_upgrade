import axios from "axios"

interface commentListparmas {
    params: number | string | undefined,
    page: number, 
    type: string
} 
export const commentList = async ({params, page, type}:commentListparmas) => {
    try {
        const result = await axios.get(`/api/comment/list/${params}`, {params: {page, type}})
        if(result.status === 200) return result.data
    } catch (err) {
        console.log(err)
        return null;
    }
}

export default commentList