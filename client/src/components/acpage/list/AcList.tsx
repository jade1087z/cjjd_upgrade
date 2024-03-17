import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AcRank from "../rank/AcRank";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineGlassEmpty,
    faComment,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { DrinkList } from "../../../interface/post/acList.interface";
import { dinkListAll } from "../../../axios/acList/list/listAll";
const card1 = require("../../../assets/img/card (1).gif")


const AcList: React.FC = () => {

    const [drinkList, setDrinkList] = useState<DrinkList[]>([])
    const [category, setCategory] = useState<string>('전체');
    const btnList = ['전체', '소주', '맥주', '와인', '위스키', '막걸리'];

    const fetchList = async (category: string) => {
        const result: DrinkList[] = await dinkListAll({ category })
        setDrinkList(result)
    }
    useEffect(() => {
        fetchList(category);
    }, [category])

    console.log(drinkList)
    return (
        <>
            <AcRank />
            <div className="alcohol_select">
                <div className="btnWrap">
                    {btnList.map((li, key) => (
                        <button className={li === category ? 'active' : ''} key={key}
                            onClick={() => setCategory(li)}>{li}</button>
                    ))}
                </div>
            </div>

            <div className="alcohol_item">
                <ul>
                    {drinkList && drinkList.map((li, key) => (
                        <li className="boxStyle roundCorner shaDow" key={key}>
                        <Link to={`/acview/${key}`}>
                            <div className="item_img">
                                <img src={card1} alt="alcohol" />
                            </div>
                            <div className="item_info">
                                <h4>{li.acName}</h4>
                                <p>{li.acCompany}</p>
                            </div>
                            <div className="item_summary">
                                <ul>
                                    <li className="summary_good">
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span>{li.acLike}</span>
                                    </li>
                                    <li className="summary_comment">
                                        <FontAwesomeIcon icon={faComment} />
                                        <span>{li.acComment}</span>
                                    </li>
                                    <li className="summary_abv">
                                        <FontAwesomeIcon icon={faWineGlassEmpty}/>
                                        <span>{li.acAbv}</span>
                                    </li>
                                </ul>
                            </div>
                        </Link>
                    </li>
                    ))}
                    
                </ul>
            </div>
        </>
    );
};

export default AcList;
