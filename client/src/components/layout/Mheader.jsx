import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faHeart,
    faComment,
    faGift,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

const Mheader = () => {
    return (
        <>
            <div className="topLogo">
                <h1 className="header_logo">
                    <Link to="/">
                        <img
                            src={require("../../assets/img/logo.svg").default}
                            alt="logo"
                        />
                    </Link>
                </h1>
            </div>
            <header id="header" className="bottomHeader shaDow">
                <nav className="header_nav" role="navigation" aria-label="main">
                    <ul>
                        <li>
                            <Link to="/">
                                <FontAwesomeIcon icon={faHouse} />홈
                            </Link>
                        </li>
                        <li>
                            <Link to="../alcohol/alcohol.php">
                                <FontAwesomeIcon icon={faHeart} /> 술 리뷰
                            </Link>
                        </li>
                        <li>
                            <Link to="/community">
                                <FontAwesomeIcon icon={faComment} /> 자유 게시판
                            </Link>
                        </li>
                        <li>
                            <Link to="event.html">
                                <FontAwesomeIcon icon={faGift} /> 이벤트
                            </Link>
                        </li>
                        <li>
                            <Link to="../mypage/mypage.php">
                                <FontAwesomeIcon icon={faUser} /> 마이페이지
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
};
export default Mheader;
