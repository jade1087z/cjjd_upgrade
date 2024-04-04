import React, { useState } from 'react'
import { reducerUser } from '../../../interface/user/userInterface'
import { FilePond } from 'react-filepond'
import { registerPlugin } from 'filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

registerPlugin(FilePondPluginImagePreview);
interface PictureModalProps {
    user: reducerUser,
    onClose: () => void
}

const PictureModal: React.FC<PictureModalProps> = ({ user, onClose }) => {
    const [file, setFile] = useState(null)

    return (
        <>
            <div className='filePondWrap'>
                <div className="filepond">
                    <FilePond
                        labelIdle=''
                        allowMultiple={false}
                        className="custom-filepond"
                        onupdatefiles={(fileItems) => {
                            setFile(fileItems.map((fileItem) => fileItem.file))
                        }}
                    />
                </div>

                <div className='btnWrap'>
                    <button className="submit">수정 완료</button>
                    <button onClick={onClose} className="close">닫기</button>
                </div>
            </div>
        </>
    )
}

export default PictureModal