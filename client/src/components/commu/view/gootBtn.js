import axios from "axios";

export const goodBtn = async(e, params, btnLike, setBtnLike, setPost ) => {
    e.preventDefault()
    let body = {
        myMemberId: 1,
        isLiked: btnLike
    }
    console.log('clcik')
    await axios.post(`/api/post/boardLike/${params}`, body).then((res) => {
        if(res.data.success) {
            setBtnLike(!btnLike)
            setPost(prevPost => ({
                ...prevPost,
                boardLike: btnLike ? prevPost.boardLike - 1 : prevPost.boardLike + 1
            }))
        }
    }).catch((err) => {
        console.log(err)
    })
}
export default goodBtn;