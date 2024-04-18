import React from 'react'
import register from '../../../axios/user/register'
import { userInterface } from '../../../interface/user/userInterface'
interface BtnWrapProps  extends userInterface{
    check: boolean;
}
const BtnWrap: React.FC<BtnWrapProps> = (props) => {
    const {check} = props
    const cancle = (e) => {
        if(window.confirm('회원가입을 취소하시겠습니까?')){
            console.log('취소 ')
            window.location.href = '/'
        }
    }
    return (
        <div className="join__btn">
            <button className="check__btn button__style" onClick={(e) => register(props, check)}>
                가입하기
            </button>
            <button className="check__btn button__style" onClick={(e) => cancle(e)}>
                가입취소
            </button>
        </div>
    )
}

export default BtnWrap