import axios from "axios"


export const commentList = async (params:number | string | undefined) => {
    try {
        const result = await axios.get(`/api/comment/list/${params}`)
        if(result.status === 200) {
            return result.data.result;
        } 
    } catch (err) {
        console.log(err)
        return null;
    }
}

export default commentList