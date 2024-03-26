import axios from "axios"

interface acDetailProps {
    params: number | string | undefined;
    myMemberId: number;
    setBtnLike: (arg: boolean) => void;
}

export const acDetail = async ({params, myMemberId, setBtnLike}:acDetailProps) => {
    console.log(params)
    try {
        const result = await axios.get(`/api/acList/view/${params}`,{params: { myMemberId }})
        console.log(result.data)
        setBtnLike(result.data.isLiked)
        return result.data.result    
    } catch (error) {
        console.log(error)
        // window.location.href = '/aclist'
        return undefined
    }
}