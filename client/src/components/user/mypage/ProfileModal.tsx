import React from 'react'
import { reducerUser } from '../../../interface/user/userInterface'

interface ProfileModalProps {
    user: reducerUser,
    onClose: () => void 
}

const ProfileModal:React.FC<ProfileModalProps> = ({user, onClose}) => {
  return (
    <div>ProfileModal</div>
  )
}

export default ProfileModal