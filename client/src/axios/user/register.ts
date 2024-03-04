import axios from "axios"
import { userInterface } from "../../interface/user/userInterface"

export const register = async (props: userInterface, check: boolean) => {
    console.log(check)
    if (check) {
        await axios.post('/api/user/register', props).then((res) => {
            if (res.status === 200) {
                console.log('axios ok')
                alert('회원가입이 완료되었습니다.')
                window.location.href = '/'
            } else {
                console.log('axios else')
            }
        }).catch((error) => {
            console.log('no axios')
        })
    } else {
        alert('중복 검사를 완료해주세요.')
    }
}
export default register