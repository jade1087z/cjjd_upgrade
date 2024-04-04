import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../../reducer/store'
import axios from 'axios'
import { FilePond } from 'react-filepond'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'

const banner = require("../../../assets/img/mypage_header.jpg")
const profileImg = require("../../../assets/img/profile.png")

const ModifyUser: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const youImg = user?.youImgFile
    const [file, setFile] = useState(null)
    const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            alert('로그인을 진행해주세요.');
            navigate('/login');
        }
    }, [user, navigate]);


    // const ProfileSubmit = async () => {

    //     if (file) {
    //         const fileData = file[0]
    //         const formData = new FormData()

    //         formData.append('file', fileData)
    //         formData.append('uid', user.uid)

    //         await axios.post('/api/user/profileupload', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         }).then(async(res) => {
    //             if (res.data.success) {
    //                 alert('프로필이 변경되었습니다.')
    //                 console.log(res.data.success)
    //                 console.log(res.data.photoURL)
    //                 dispatch(updatePhotoURL(res.data.photoURL))
    //             }
    //         }).catch((err) => {
    //             alert('프로필 변경에 실패했어요.')
    //             console.log(err)
    //         })
    //     }
    // }

    return (
        <div className="best_list boxStyle roundCorner shaDow">
        <div className="tab-content mypage_main">
            <div className="main_box">
                <div className="header_img">
                    <img src={banner} alt="" />
                </div>
                <div className="profile_box">
                    <div className="left">
                        <div className='profile_img'>
                            <img src={profileImg} alt="" />
                            <FilePond
                                allowMultiple={false}
                                className="custom-filepond"
                                onupdatefiles={(fileItems) => {
                                    setFile(fileItems.map((fileItem) => fileItem.file))
                                }}
                            />
                        </div>
                    </div>
                    <div className="right">
                        <ul>
                            <li><em>닉네임 : </em>{user?.youNick}님</li>
                            <li><em>이름 : </em>{user?.youId}</li>
                            <li><em>이메일 : </em>{user?.youEmail}</li>
                        </ul>
                    </div>
                </div>
                <div className="profile_modify">
                    <ul>
                        <li>
                            <Link to="/profileModify">
                                프로필 수정하기
                            </Link>
                        </li>
                        <li>
                            <Link to={`/myList/${user?.myMemberId}`} >내가 쓴 게시글 보기</Link>
                        </li>
                        <li>
                            <Link to={`/myComment/${user?.myMemberId}`} >내가 쓴 댓글 보기</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ModifyUser