import React from 'react'
import { faWineGlassEmpty, faEye, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BottomData = ({acView}) => {
    return (
        <div className="item_summary alcohol_summary boxStyle roundCorner shaDow">
            <ul>
                <li className="summary_good">
                    <p><FontAwesomeIcon icon={faThumbsUp} /> 추천수</p>
                    <span>{acView?.acLike}</span>
                </li>
                <li className="summary_comment">
                    <p><FontAwesomeIcon icon={faEye} />조회수</p>
                    <span>{acView?.acView}</span>
                </li>
                <li className="summary_abv">
                    <p><FontAwesomeIcon icon={faWineGlassEmpty} />도수</p>
                    <span>{acView?.acAbv}</span>
                </li>
            </ul>
        </div>
    )
}

export default BottomData
