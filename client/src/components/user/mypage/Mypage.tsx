import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../reducer/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import PictureModal from './PictureModal';
import ProfileModal from './ProfileModal';

const banner = require("../../../assets/img/mypage_header.jpg")
const profileImg = require("../../../assets/img/profile.png")

const Mypage: React.FC = () => {

    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('로그인을 진행해주세요.');
            navigate('/login');
        }
    }, [user, navigate]);

    const [isProfile, setIsProfile] = useState<boolean>(false)
    const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImage(e.target?.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const profileModify = () => {
        setIsProfile(true)
    }
    const closeModal = () => {
        setIsProfile(false)
    }

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
                                <img src={selectedImage ? selectedImage.toString() : ''} alt="" />
                                <div className='gearWrap'>
                                    <FontAwesomeIcon icon={faGear} />
                                </div>
                                <input type="file" name="profileImage" accept="image/*" onChange={handleImageChange} />
                            </label>
                        </div>
                        <div className="right">
                            <ul className='profile'>
                                <li><em>닉네임 : </em>{user?.youNick ? `${user?.youNick}님` : ''}</li>
                                <li><em>이름 : </em>{user?.youId}</li>
                                <li><em>이메일 : </em>{user?.youEmail}</li>
                            </ul>
                            <ul className='myData'>
                                <li><Link to={`/myList/${user?.myMemberId}`} >내가 쓴 게시글 보기</Link></li>
                                <li><Link to={`/myComment/${user?.myMemberId}`} >내가 쓴 댓글 보기</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="profile_modify">
                        <ul>
                            <li onClick={profileModify}>프로필 수정하기</li>
                            <li onClick={profileModify}>변경사항 저장하기</li>

                        </ul>
                    </div>
                </div>
                {isProfile && <ProfileModal user={user} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default Mypage;
