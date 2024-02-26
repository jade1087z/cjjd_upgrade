import React from "react";
import { Link } from "react-router-dom";
import AcRank from "../rank/AcRank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineGlassEmpty,
    faComment,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
const card1 = require("../../../assets/img/card (1).gif")
const AcList = () => {
    return (
        <>
            <AcRank />

            <div className="alcohol_select">
                <ul>
                    <li className="active">
                        <Link to="alcohol_list.html">전체</Link>
                    </li>
                    <li>
                        <Link to="alcohol_list.html">소주</Link>
                    </li>
                    <li>
                        <Link to="alcohol_list.html">맥주</Link>
                    </li>
                    <li>
                        <Link to="alcohol_list.html">와인</Link>
                    </li>
                    <li>
                        <Link to="alcohol_list.html">위스키</Link>
                    </li>
                    <li>
                        <Link to="alcohol_list.html">막걸리</Link>
                    </li>
                </ul>
            </div>

            <div className="alcohol_item">
                <ul>
                    <li className="boxStyle roundCorner shaDow">
                        <Link to="/acview">
                            <div className="item_img">
                                <img src={card1} alt="alcohol" />
                            </div>
                            <div className="item_info">
                                <h4>진로 이즈백</h4>
                                <p>하이트</p>
                            </div>
                            <div className="item_summary">
                                <ul>
                                    <li className="summary_good">
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span>15</span>
                                    </li>
                                    <li className="summary_comment">
                                        <FontAwesomeIcon icon={faComment} />
                                        <span>24</span>
                                    </li>
                                    <li className="summary_abv">
                                        <FontAwesomeIcon
                                            icon={faWineGlassEmpty}
                                        />
                                        <span>14</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default AcList;
