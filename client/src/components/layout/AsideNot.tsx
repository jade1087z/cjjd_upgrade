import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIcons } from "@fortawesome/free-solid-svg-icons";
import AsideSearch from "./AsideSearch";
const AsideNot:React.FC = () => {
    return (
        <aside id="side_wrap">
            <AsideSearch />

            <div className="info_box side_box roundCorner shaDow">
                <div className="login_info not_login">
                    <p>
                        <FontAwesomeIcon icon={faIcons} /><br />{" "}
                        회원가입하고 <br /> 더 많은 기능을 누리세요
                    </p>
                    <ul>
                        <li>
                            <Link to="/join">회원가입</Link>
                        </li>
                        <li>
                            <Link to="/">회원정보 찾기</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/login" className="sideBtn">로그인</Link>
            </div>
        </aside>
    );
}

export default AsideNot