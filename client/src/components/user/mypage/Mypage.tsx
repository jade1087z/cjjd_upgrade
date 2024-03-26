import React from 'react'
import { Link } from 'react-router-dom'
const banner = require("../../../assets/img/mypage_header.jpg")
const profileImg = require("../../../assets/img/profile.png")
const Mypage: React.FC = () => {
    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <div className="tab-content mypage_main">
                <div className="main_box">
                    <div className="header_img">
                        <img src={banner} alt="" />
                    </div>
                    <div className="profile_box">
                        <div className="profile_img">
                            <img src={profileImg} alt="" />
                        </div>
                        <div className="profile_text">
                            <div className="youNick">
                                <h2>닉네임</h2>
                            </div>
                            <div className="youId">
                                <span>@abcdef_01234</span>
                            </div>
                            <div className="youemail">
                                <span>12345890@naver.com</span>
                            </div>
                        </div>
                        <div className="profile_modify">
                            <ul>
                                <li>
                                    <Link to="profilemodify.php">
                                        프로필 수정하기
                                    </Link>
                                </li>
                                <li>
                                    <Link to={''} id="not_join">내 활동</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
