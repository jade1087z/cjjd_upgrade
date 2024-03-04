import React from 'react'
import register from '../../../axios/user/register'
import { userInterface } from '../../../interface/user/userInterface'
interface BtnWrapProps  extends userInterface{
    check: boolean;
}
const BtnWrap: React.FC<BtnWrapProps> = (props) => {
    const {check} = props
    return (
        <div className="join__btn">
            <button className="check__btn button__style" onClick={(e) => register(props, check)}>
                가입하기
            </button>
            <button className="check__btn button__style">
                가입취소
            </button>
        </div>
    )
}

export default BtnWrap