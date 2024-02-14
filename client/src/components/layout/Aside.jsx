import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faIcons } from "@fortawesome/free-solid-svg-icons";

const Aside = () => {
    return (
        <aside id="side_wrap">
            <form
                action="../board/board_result.php?search="
                method="get"
                className="search_box side_box roundCorner shaDow"
            >
                <input
                    type="text"
                    name="search"
                    placeholder="취중진담 통합 검색"
                    id="search"
                />
                <button type="submit" id="searchBtn">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
            <div className="info_box side_box roundCorner shaDow">
                <div className="login_info">
                    <img
                        src="../assets/profile/<?= $memberInfo['youImgFile'] ?>"
                        alt="<?= $_SESSION['youId'] ?>"
                    />
                    <p>님 어서오세요.</p>
                    <ul>
                        <li>
                            <Link to="../login/logout.php">로그아웃</Link>
                        </li>
                        <li>
                            <Link to="../mypage/mypage.php">마이페이지</Link>
                        </li>
                    </ul>
                </div>
                <button
                    className="sideBtn"
                    onclick="location.href='../board/board_write.php'"
                >
                    새 글쓰기
                </button>
            </div>

            {/*<div className="info_box side_box roundCorner shaDow">
                 <div className="login_info not_login">
                     <p>
                         <FontAwesomeIcon icon={faIcons} /><br />{" "}

                         회원가입하고 <br /> 더 많은 기능을 누리세요
                     </p>
                     <ul>
                         <li>
                             <Link to="../join/join.php">회원가입</Link>
                         </li>
                         <li>
                             <Link to="findpass.html">회원정보 찾기</Link>
                         </li>
                     </ul>
                 </div>
                 <button
                     className="sideBtn"
                     onclick="location.href='../login/login.php'"
                 >
                     로그인
                 </button>
    </div> */}
        </aside>
    );
};

export default Aside;
