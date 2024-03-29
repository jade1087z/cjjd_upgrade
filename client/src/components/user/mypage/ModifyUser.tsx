import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../reducer/store'
const banner = require("../../../assets/img/mypage_header.jpg")
const profileImg = require("../../../assets/img/profile.png")

const ModifyUser: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    console.log(user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('로그인을 진행해주세요.');
            navigate('/login');
        }
    }, [user, navigate]);

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
                                <h2>{user?.youNick}</h2>
                            </div>
                            <div className="youId">
                                <p>{user?.youId}</p>
                            </div>
                            <div className="youemail">
                                <p>{user?.youEmail}</p>
                            </div>
                        </div>
                        <div className="profile_modify">
                            <ul>
                                <li><button>
                                    수정완료
                                </button></li>
                                <li><button>
                                    수정취소
                                </button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModifyUser