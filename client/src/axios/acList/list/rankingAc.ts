import axios from "axios"
import { DrinkList } from "../../../interface/post/acList.interface";

interface drinkResponse {
    drinkList: DrinkList[] 
}
export const ranking = async (): Promise<DrinkList[]> => {
    return await axios.get<drinkResponse>(`/api/acList/ranking`)
    .then((res) =>{
        if(res.status === 200) {
            return res.data.drinkList;
        } else {
            console.log('else error', res);
            return []
        }
    }).catch((err) => {
        console.log(err)
        return []
    })
}
export default ranking
