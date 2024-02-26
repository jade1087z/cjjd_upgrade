import React from 'react'
import register from '../../../axios/user/register'
import { userInterface } from '../interface/userInterface'
interface BtnWrapProps  extends userInterface{}
const BtnWrap: React.FC<BtnWrapProps> = (props) => {

    return (
        <div className="join__btn">
            <button className="check__btn button__style" onClick={(e) => register(props)}>
                가입하기
            </button>
            <button className="check__btn button__style">
                가입취소
            </button>
        </div>
    )
}

export default BtnWrap