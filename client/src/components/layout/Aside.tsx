import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducer/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {clearUser} from '../../reducer/user'
const Aside: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();    

    const logout = (e: React.MouseEvent) => {
        
        e.preventDefault()
        if(window.confirm('로그아웃 하시겠습니까?')){
            localStorage.removeItem('accessToken');
            dispatch(clearUser())
        }
    }
   
    return (
        <aside id="side_wrap">
            <div className="search_box side_box roundCorner shaDow">
                <input type="text" placeholder="취중진담 통합 검색" id="search" />
                <button type="submit" id="searchBtn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className="info_box side_box roundCorner shaDow">
                <div className="login_info">
                    <img src="../assets/profile/<?= $memberInfo['youImgFile'] ?>" />
                    <p>{user.youNick}님 어서오세요.</p>
                    <ul>
                        <li>
                            <button onClick={(e) => logout(e)}>로그아웃</button>
                        </li>
                        <li>
                            <Link to="/mypage">마이페이지</Link>
                        </li>
                    </ul>
                </div>
                <Link to={"/write"} className="sideBtn">
                    새 글쓰기
                </Link>
            </div>
        </aside>
    );
};

export default Aside;
