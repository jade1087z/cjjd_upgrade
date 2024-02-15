import React from "react";
import card1 from "../../../assets/img/card (1).gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWineGlassEmpty,
    faComment,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const AcVIiew = () => {
    return (
        <>
            <div className="alcohol_info boxStyle roundCorner shaDow">
                <div className="alcohol_thumbnail"></div>

                <div className="alcohol_desc">
                    <div className="alcohol_img">
                        <img src={card1} alt="alcohol" />
                    </div>
                    <div className="alcohol_detail">
                        <h4>마르체시나 화이트</h4>
                        <p>깜비뇽 임페리얼</p>
                        <em className="scrollStyle">
                            말린 과일 셰리 바닐라 스모키 우디 따뜻한 스파이시
                            베이스로 입문자에게 추천하는 깔끔한 기본 위스키
                        </em>
                        <button className="good_btn">
                            <FontAwesomeIcon icon={faThumbsUp} />
                            추천합니다.
                        </button>
                    </div>
                </div>
            </div>
            <div className="item_summary alcohol_summary boxStyle roundCorner shaDow">
                <ul>
                    <li className="summary_good">
                        <p>
                            <FontAwesomeIcon icon={faThumbsUp} /> 추천수
                        </p>
                        <span>15</span>
                    </li>
                    <li className="summary_comment">
                        <p>
                            <FontAwesomeIcon icon={faComment} />
                            후기
                        </p>
                        <span>24</span>
                    </li>
                    <li className="summary_abv">
                        <p>
                            <FontAwesomeIcon icon={faWineGlassEmpty} />
                            도수
                        </p>
                        <span>14</span>
                    </li>
                </ul>
            </div>

            <div className="alcohol_review boxStyle roundCorner shaDow">
                <h4>
                    후기 <span>0</span>
                </h4>
                <ul className="review_wrap">
                    <li>
                        <div className="review_text">
                            <span>아직 작성 된 후기가 없습니다.</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="alcohol_review boxStyle roundCorner shaDow">
                <h4>
                    후기 <span>24</span>
                </h4>
                <ul className="review_wrap">
                    <li>
                        <div className="review_text">
                            <strong className="textCut">안주킬러</strong>
                            <p>피자랑 먹으면 개꿀맛</p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="review_text">
                            <strong className="textCut">
                                닉네임닉네임닉네임닉네임
                            </strong>
                            <p>
                                술 땡기는 금요일~ 곱창에 소주 땡기네요.땡기는
                                금요일~ 곱창에 소주 땡기네요.땡기는 금요일~
                                곱창에 소주 땡기네요.땡기는 금요일~ 곱창에 소주
                                땡기네요.땡기는 금요일~ 곱창에 소주
                                땡기네요.땡기는 금요일~ 곱창에 소주
                                땡기네요.땡기는 금요일~ 곱창에 소주 땡기네요.
                            </p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="review_text">
                            <strong className="textCut">술자리주인공</strong>
                            <p>자주 마셔요. 가성비도 굿</p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="review_text">
                            <strong className="textCut">위스키전문가</strong>
                            <p>입문자에게 추천하는 위스키~</p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="review_text">
                            <strong className="textCut">안주킬러</strong>
                            <p>피자랑 먹으면 개꿀맛</p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                    <li>
                        <div className="review_text">
                            <strong className="textCut">술자리주인공</strong>
                            <p>자주 마셔요. 가성비도 굿</p>
                            <Link to="/" className="modify">
                                수정
                            </Link>
                            <Link to="/" className="delete">
                                삭제
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="boxStyle roundCorner shaDow">
                <h4>후기 작성하기</h4>
                <div className="review_add">
                    <textarea
                        className="scrollStyle"
                        name="review_write"
                        id="review_write"
                        placeholder="내 입맛에 어땠는지 의견을 나눠요."
                    ></textarea>
                    <button>작성하기</button>
                </div>
            </div>
        </>
    );
};

export default AcVIiew;
