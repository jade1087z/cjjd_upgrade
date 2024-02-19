import axios from "axios";
export const boardDetail = async (params) => {
    console.log(params);
    return await axios
        .get(`/api/post/view/${params}`)
        .then((res) => {
            if (res.data.success) {
                console.log("axios ok");
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
