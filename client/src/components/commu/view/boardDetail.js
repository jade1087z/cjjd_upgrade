import axios from "axios";
export const boardDetail = async (params, setBtnLike) => {
    console.log(params);
    return await axios
        .get(`/api/post/view/${params}`)
        .then((res) => {
            if (res.data.success) {
                setBtnLike(res.data.isLiked)
                return res.data.post;
            } else {
                console.log("axios fail");
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
export default boardDetail;
