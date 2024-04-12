import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../reducer/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { handleImageChange } from '../../../axios/user/handleImageChange';


const banner = require("../../../assets/img/mypage_header.jpg")

const Mypage: React.FC = () => {

    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId;
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        if (myMemberId === 0) {
            alert('로그인을 진행해주세요.');
            navigate('/login');
        }
    }, [user, navigate]);

    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    return (
        <div className="best_list boxStyle roundCorner shaDow">
            <div className="tab-content mypage_main">
                <div className="main_box">
                    <div className="header_img">
                        <img src={banner} alt="" />
                    </div>
                    <div className="profile_box">
                        <div className="left">
                            <label className='profile_img'>
                                <img src={selectedImage ? selectedImage.toString() : `${user.youImgFile}`} alt="" />
                                <div className='gearWrap'><FontAwesomeIcon icon={faGear} /></div>
                                <input type="file" name="profileImage" accept="image/*" onChange={(e) => handleImageChange({e, myMemberId, setSelectedImage})} />
                            </label>
                        </div>
                        <div className="right">
                            <ul className='profile'>
                                <li><em>닉네임 : </em>{user?.youNick ? `${user?.youNick}님` : `${user.youNick}`}</li>
                                <li><em>이름 : </em>{user?.youId}</li>
                                <li><em>이메일 : </em>{user?.youEmail}</li>
                            </ul>
                            <ul className='myData'>
                            </ul>
                        </div>
                    </div>
                    <div className="profile_modify">
                        <ul>
                            <li><Link to={`/myList/${user?.myMemberId}`} >내가 쓴 게시글 보기</Link></li>
                            <li><Link to={`/myComment/${user?.myMemberId}`} >내가 쓴 댓글 보기</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mypage;
