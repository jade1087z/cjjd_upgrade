import axios from "axios"
import { DrinkList } from "../../../interface/acList.interface";

interface drinkResponse {
    drinkList: DrinkList[] 
}
export const dinkListAll = async ({category}): Promise<DrinkList[]> => {
    console.log(category)
    return await axios.get<drinkResponse>(`/api/acList/list/${category}`)
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
export default dinkListAll
