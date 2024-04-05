import React from 'react'
import { reducerUser } from '../../../interface/user/userInterface'

interface ProfileModalProps {
  user: reducerUser,
  onClose: () => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="modal__wrap best_list boxStyle roundCorner shaDow">
      <div className='modal__title'>프로필 수정하기</div>
      <div className="right">
        <ul className='profile'>
          <li><em>닉네임 : </em><input type="text" value={user?.youNick}/></li>
          <li><em>이름 : </em><input type="text" value={user?.youId}/></li>
          <li><em>이메일 : </em><input type="text" value={user?.youEmail}/></li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileModal