import React, { useState, ChangeEvent, useEffect } from "react";
import BtnWrap from "./BtnWrap";
import { userInterface } from "../../../interface/userInterface";
import checkFunction from "../../../axios/user/checkFunction";
const Join = () => {
    const [formValues, setFormValues] = useState<userInterface>({
        youId: '',
        youPass: '',
        youPassC: '',
        youName: '',
        youNick: '',
        youEmail: '',
        youBirth: '',
        youAddress1: '',
        youAddress2: '',
        youAddress3: '',
    });

    const [check, setCheck] = useState<boolean>(false);
    const [idCheck, setIdCheck] = useState<boolean>(false);
    const [nickCheck, setNickCheck] = useState<boolean>(false);
    const [emailCheck, setEmailCheck] = useState<boolean>(false);
    const [checkPass, setCheckPass] = useState<boolean>(false);

    useEffect(() => {
        checkFunction.checkAll({idCheck, nickCheck, emailCheck, checkPass, setCheck});
    }, [idCheck,nickCheck,emailCheck,checkPass])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value} = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
        if(name === 'youPassC') {
            setCheckPass(formValues.youPass === value)
        }
    }
    return (
        <div id="join__wrap">
            <div id="main">
                <div className="join__form">
                    <div className="form">
                        <div>
                            <legend className="blind">회원가입 영역</legend>
                            <div className="header__box">
                                <h1><a href="index.html">취중진담</a></h1>
                                <p>회원이 되어 다양한 혜택을 경험해보세요.</p>
                            </div>
                            <div className="">
                                <div className="check">
                                    <label htmlFor="youID" className="required">아이디</label>
                                    <input type="text" name="youId" placeholder="아이디 입력(6~20)"
                                        onChange={handleInputChange} />
                                    <button className="check__btn button__style"
                                        onClick={(e) => checkFunction.checkId(e, formValues, setIdCheck)}>중복 검사</button>
                                    <p className="check__msg">아이디는 추후 수정이 불가합니다.</p>
                                </div>
                                <div>
                                    <label htmlFor="youPass" className="required">비밀번호</label>
                                    <input type="password" name="youPass" onChange={handleInputChange}
                                        placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20)" />
                                </div>
                                <div>
                                    <label htmlFor="youPassC" className="required">비밀번호 확인</label>
                                    <input type="password" name="youPassC" onChange={handleInputChange}
                                        placeholder="비밀번호 재입력" />
                                    <p className="check__msg">아이디는 추후 수정이 불가합니다.</p>
                                </div>
                                <div>
                                    <label htmlFor="youName" className="required">이름</label>
                                    <input type="text" name="youName" onChange={handleInputChange}
                                        placeholder="이름 입력(문자 2~5)" />
                                </div>
                                <div className="check">
                                    <label htmlFor="youNick" className="required">닉네임</label>
                                    <input type="text" name="youNick" onChange={handleInputChange}
                                        placeholder="닉네임 입력(문자 2~5)" />
                                    <button className="check__btn button__style" onClick={(e) => checkFunction.checkNick(e, formValues, setNickCheck)}>중복 검사</button>
                                    <p className="check__msg">아이디는 추후 수정이 불가합니다.</p>
                                </div>
                                <div className="check">
                                    <label htmlFor="youEmail" className="required">이메일</label>
                                    <input type="text" name="youEmail" onChange={handleInputChange} placeholder="이메일 입력" />
                                    <button className="check__btn button__style" onClick={(e) => checkFunction.checkEmail(e, formValues, setEmailCheck)}>중복 검사</button>
                                    <p className="check__msg">아이디는 추후 수정이 불가합니다.</p>
                                </div>
                                <div className="email__area">
                                    <label htmlFor="youAddress1" className="required">주소</label>
                                    <div className="check youAddress1">
                                        <input type="text" name="youAddress1" placeholder="우편번호" onChange={handleInputChange}
                                            className="input__style" />
                                        <div className="check__btn" >주소 찾기</div>
                                    </div>
                                    <label htmlFor="youAddress2" className="blind"></label>
                                    <input type="text" name="youAddress2" placeholder="주소" onChange={handleInputChange}
                                        className="input__style" />
                                    <label htmlFor="youAddress3" className=" blind youAddress3"></label>
                                    <input type="text" name="youAddress3" placeholder="상세 주소" onChange={handleInputChange}
                                        className="input__style" />
                                    <p className="msg box" ></p>
                                </div>
                                <div className="birthday__box">
                                    <label htmlFor="youBirth" className="required">생년월일</label>
                                    <input type="text" name="youBirth" placeholder="생년월일 8자 입력" onChange={handleInputChange} />
                                    <p className="check__msg">해당 사이트는 만 19세 미만 사용이 불가합니다.</p>
                                </div>
                            </div>
                        </div>
                        <BtnWrap {...formValues} check={check} />

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Join;
