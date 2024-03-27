import React, { useEffect, useState } from "react";
import tryLogin from "../../../axios/user/login";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { setUser } from "../../../reducer/user";
import { Link, useNavigate } from "react-router-dom";
const cocktail = require('../../../assets/img/cocktail.png')
const coconut = require('../../../assets/img/coconut.png')


const Login:React.FC = () => {

    const [youId, setYouId] = useState<string>('');
    const [youPass, setYouPass] = useState<string>('');
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
    
    const tryLoginLogic = async (e: React.MouseEvent | React.KeyboardEvent, youId: string, youPass: string) => {
        const user = await tryLogin(e, youId, youPass);
        dispatch(setUser(user));
    }
    
    return (
        <div id="login__wrap">
            <main id="login">
                <div className="login__box">
                    <div className="left">
                        <img className="cocktail" src={cocktail} alt="cocktail" aria-hidden="true" />
                        <img className="coconut" src={coconut} alt="coconut" aria-hidden="true" />
                    </div>
                    <div className="right">
                        <div className="logo"><Link to={"/"}>취중진담 홈</Link></div>
                        <div className="login_box">
                            <input type="text"  placeholder="아이디를 입력하세요." className="login_ID" 
                            onChange={(e) => setYouId(e.target.value)} 
                            onKeyPress={(e) => {if(e.key === 'Enter') {tryLoginLogic(e, youId, youPass)}}}
                            />
                            <input type="password" placeholder="비밀번호를 입력하세요." className="login_Pass"
                             onChange={(e) => setYouPass(e.target.value)}
                             onKeyPress={(e) => {if(e.key === 'Enter') {tryLoginLogic(e, youId, youPass)}}}
                             />
                            
                            <div className="check">
                                <label htmlFor="agreeCheck1">
                                    아이디 저장
                                    <input type="checkbox" name="agreeCheck1" id="agreeCheck1" />
                                    <span className="indicator"></span>
                                </label>
                            </div>

                            <button className="button__style" onClick={(e) => tryLoginLogic(e, youId, youPass )}>로그인</button>
                            <ul className="login_go">
                                <li><Link to={"/"}>비밀번호 찾기</Link></li>
                                <li><Link to={"/join"}>회원가입</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <div id="footer">
                <p> 알코올은 발암물질로 지나친 음주는 간암, 위암 등을 일으킵니다.<br />
                    임신 중 음주는 기형아 출생 위험을 높입니다.</p>
            </div>
        </div>
    )
};

export default Login;
