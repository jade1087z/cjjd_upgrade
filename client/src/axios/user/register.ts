import axios from "axios"
import { userInterface } from "../../components/user/interface/userInterface"

export const register = async(props:userInterface) => {
   console.log(props)
    await axios.post('/api/user/register', props).then((res) => {
        if(res.status === 200) {
            console.log('axios ok')
        } else {
            console.log('axios else')
        }
    }).catch((error) => {
        console.log('no axios')
    })
}
export default register