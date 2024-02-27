import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Aside:React.FC = () => {
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
                    <p>님 어서오세요.</p>
                    <ul>
                        <li>
                            <Link to="../login/logout.php">로그아웃</Link>
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
