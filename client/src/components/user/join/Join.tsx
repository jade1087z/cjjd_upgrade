import React, { useState, useEffect } from "react";
import BtnWrap from "./BtnWrap";
import { userInterface } from "../../../interface/userInterface";
import checkFunction from "../../../axios/user/checkFunction";
import Address from "./Address";
import handleInputChange from "../../../util/user/join/handleInput";

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
    const [idCheck, setIdCheck] = useState<boolean | null>(null);
    const [nickCheck, setNickCheck] = useState<boolean | null >(null);
    const [emailCheck, setEmailCheck] = useState<boolean | null>(null);
    const [checkPass, setCheckPass] = useState<boolean | null>(null);
    

    useEffect(() => {
        checkFunction.checkAll({idCheck, nickCheck, emailCheck, checkPass, setCheck});
    }, [idCheck,nickCheck,emailCheck,checkPass])


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
                            <div className="join__data">
                                <div className="check">
                                    <label htmlFor="youID" className="required">아이디</label>
                                    <input type="text" name="youId" placeholder="아이디 입력(6~20)"
                                        onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)} />
                                    <button className="check__btn button__style"
                                        onClick={(e) => checkFunction.checkId(e, formValues, setIdCheck)}>중복 검사</button>
                                        {idCheck === null ? <p className="check__msg">아이디 중복 검사를 해주세요.</p> : idCheck ? <p className="check__msg">사용할 수 있는 아이디입니다.</p> : <p className="check__msg">사용할 수 없는 아이디입니다.</p>}
                                </div>
                                <div>
                                    <label htmlFor="youPass" className="required">비밀번호</label>
                                    <input type="password" name="youPass" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)}
                                        placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20)" />
                                </div>
                                <div>
                                    <label htmlFor="youPassC" className="required">비밀번호 확인</label>
                                    <input type="password" name="youPassC" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)}
                                        placeholder="비밀번호 재입력" />
                                        {checkPass === null ? <p className="check__msg"></p> : checkPass ? <p className="check__msg"></p> : <p className="check__msg">비밀번호가 일치하지 않습니다.</p>}
                                </div>
                                <div>
                                    <label htmlFor="youName" className="required">이름</label>
                                    <input type="text" name="youName" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)}
                                        placeholder="이름 입력(문자 2~5)" />
                                </div>
                                <div className="check">
                                    <label htmlFor="youNick" className="required">닉네임</label>
                                    <input type="text" name="youNick" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)}
                                        placeholder="닉네임 입력(문자 2~5)" />
                                    <button className="check__btn button__style" onClick={(e) => checkFunction.checkNick(e, formValues, setNickCheck)}>중복 검사</button>
                                    {nickCheck === null ? <p className="check__msg">닉네임 중복 검사를 해주세요.</p> : nickCheck ? <p className="check__msg">사용할 수 있는 닉네임입니다.</p> : <p className="check__msg">사용할 수 없는 닉네임입니다.</p>}
                                </div>
                                <div className="check">
                                    <label htmlFor="youEmail" className="required">이메일</label>
                                    <input type="text" name="youEmail" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)} placeholder="이메일 입력" />
                                    <button className="check__btn button__style" onClick={(e) => checkFunction.checkEmail(e, formValues, setEmailCheck)}>중복 검사</button>
                                    {emailCheck === null ? <p className="check__msg">이메일 중복 검사를 해주세요.</p> : emailCheck ? <p className="check__msg">사용할 수 있는 이메일입니다.</p> : <p className="check__msg">사용할 수 없는 이메일입니다.</p>}
                                </div>
                                <Address setFormValues={setFormValues} formValues={formValues} setCheckPass={setCheckPass}/>
                                <div className="birthday__box">
                                    <label htmlFor="youBirth" className="required">생년월일</label>
                                    <input type="text" name="youBirth" placeholder="생년월일 8자 입력" onChange={(e) => handleInputChange(e,  setFormValues, formValues, setCheckPass)} />
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
