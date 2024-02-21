import axios from "axios";

export const postAll = async () => {
    return await axios
        .get("/api/post/list")
        .then((res) => {
            if (res.status === 200) {
                return res.data.postList;
            } else {
                console.log("else error", res);
                return [];
            }
        })
        .catch((err) => {
            console.log("Axios error", err); // Axios 오류 출력
            return [];
        });
};

export default postAll;

// export const postAll = async () => {
//     try {
//         const res = await axios.get("/api/post/list");
//         if (res.status === 200) {
//             console.log(res.data.postList);
//             return res.data.postList;
//         } else {
//             console.log(res.data.success);
//             console.log("else error", res);
//             return [];
//         }
//     } catch (err) {
//         console.log("Axios error", err); // Axios 오류 출력
//         return [];
//     }
// };

// 해당 방법으로는 비동기 데이터를 가져오는데 문제가 있다.
//  await 키워드가 axios.get("/api/post/list") 앞에 있지만,
//  이는 .then이나 .catch에 영향을 주지 않습니다.
//  따라서 return res.data.postList;는
//  .then의 콜백 함수 내부에서만 작동하고, postAll 함수 자체에는 아무런 영향을 주지 않습니다.
//  결국 postAll 함수는 undefined를 반환하게 됩니다.

// export const postAll = async () => {
//     await axios
//         .get("/api/post/list")
//         .then((res) => {
//             if (res.status === 200) {
//                 console.log(res.data.postList);
//                 return res.data.postList;
//             } else {
//                 console.log(res.data.success);
//                 console.log("else error", res);
//                 return [];
//             }
//         })
//         .catch((err) => {
//             console.log("Axios error", err); // Axios 오류 출력
//             return [];
//         });
// };
