import React, { ChangeEvent, useState } from 'react'
import { userInterface } from '../../../interface/userInterface'
import handleInputChange from '../../../util/user/join/handleInput';
import DaumPostcode from 'react-daum-postcode';
import { AddressData } from '../../../interface/addressData';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface AddressProps {
    setFormValues: (value: userInterface) => void;
    formValues: userInterface;
    setCheckPass: (value: boolean) => void;
}

const Address: React.FC<AddressProps> = ({ setFormValues, formValues, setCheckPass }) => {
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const handleComplete = (data: AddressData) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? `(${extraAddress})` : '');
        }
        setFormValues({
            ...formValues,
            youAddress1: data.zonecode,
            youAddress2: fullAddress,
        })
        setIsAddressModalOpen(false)
    }

    return (
        <div className="address__area">
            <label htmlFor="youAddress1" className="required">주소</label>
            <div className="check youAddress1">
                <input type="text" name="youAddress1" placeholder="우편번호" value={formValues.youAddress1}
                    className="input__style" />
                <div className="check__btn" onClick={(e) => setIsAddressModalOpen(true)} >주소 찾기</div>

                {isAddressModalOpen && (
                    <div className='address__modal'>
                        <div className='modal__header'>
                            <h1>우편번호 찾기</h1>
                            <FontAwesomeIcon icon={faX} onClick={(e) => setIsAddressModalOpen(false) } />
                        </div>
                        <DaumPostcode
                            onComplete={handleComplete}
                            autoClose={true}
                        />
                    </div>
                )}
            </div>
            <label htmlFor="youAddress2" className="blind"></label>
            <input type="text" name="youAddress2" placeholder="주소" value={formValues.youAddress2} className="input__style" />
            <label htmlFor="youAddress3" className=" blind youAddress3"></label>
            <input type="text" name="youAddress3" placeholder="상세 주소" onChange={(e) => handleInputChange(e, setFormValues, formValues, setCheckPass)}
                className="input__style" />
            <p className="msg box" ></p>
        </div>
    )
}

export default Address