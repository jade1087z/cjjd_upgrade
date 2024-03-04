import { error } from "console"
import { userInterface } from "../../interface/user/userInterface"
import axios from "axios"
import { checkInterface } from "../../interface/user/checkInterface"

export const checkId = async (e: React.MouseEvent, formValues: userInterface, setCheckId: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    e.preventDefault()
    if (formValues.youId) {
        const result = await check({ field: 'youId', value: formValues.youId });
        setCheckId(result)
    }
}
export const checkNick = async (e: React.MouseEvent, formValues: userInterface, setCheckNick: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    e.preventDefault()
    if (formValues.youNick) {
        const result= await check({ field: 'youNick', value: formValues.youNick });
        setCheckNick(result)
    }
}
export const checkEmail = async (e: React.MouseEvent, formValues: userInterface, setEmailCheck: React.Dispatch<React.SetStateAction<boolean | null>>) => {
    e.preventDefault()
    if (formValues.youEmail) {
        const result= await check({ field: 'youEmail', value: formValues.youEmail });
        setEmailCheck(result)
    }
}

export const check = async (data: { field: string, value: string }) => {
    try {
        const res = await axios.post('/api/user/check', data);
        if (res.status === 200) {
            return res.data.success !== undefined ? res.data.success : false;
        } else if(res.status === 400) {
            alert('중복 검사에 실패하였습니다.')
            return false
        }
    } catch (error) {
        console.log(error)
        alert('중복 검사에 실패하였습니다.')
        return false
    }
}

const checkAll = ({idCheck, nickCheck, emailCheck, checkPass, setCheck}: checkInterface) => {
    if (idCheck && nickCheck && emailCheck &&checkPass) {
        setCheck(true)
    } else {
        setCheck(false)
    }
    
}

export default { checkId, checkNick, checkEmail, checkAll };