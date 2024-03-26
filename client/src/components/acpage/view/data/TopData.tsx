import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import acGoodBtn from '../../../../axios/acList/view/acGoodBtn';
import { alcohol } from '../../../../../../server/interface/acInterface/ac.Interface';

interface TopDataProps {
    acView: alcohol | null,
    params: number | string | undefined,
    myMemberId: number,
    acId: string,
    btnLike: boolean,
    setBtnLike: (arg: boolean) => void,
    setAcView: (arg: alcohol) => void
}

const TopData: React.FC<TopDataProps> = ({ acView, params, myMemberId, acId, btnLike, setBtnLike, setAcView }) => {
    return (
        <div className="alcohol_info boxStyle roundCorner shaDow">
            <div className="alcohol_thumbnail"></div>

            <div className="alcohol_desc">
                <div className="alcohol_img">
                    <img src={acView?.acImgPath} alt="alcohol" />
                </div>
                <div className="alcohol_detail">
                    <h4>{acView?.acCompany}</h4>
                    <p>{acView?.acName}</p>
                    <em className="scrollStyle">
                        {acView?.acDesc}
                    </em>
                    <button className="good_btn" onClick={(e) => acGoodBtn({ e, params, myMemberId, btnLike, setBtnLike, setAcView })}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                        추천합니다.
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TopData