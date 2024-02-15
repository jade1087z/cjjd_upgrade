import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import card5 from "../../../assets/img/card (5).gif";

const AcRank = () => {
    return (
        <div className="ranking_list boxStyle roundCorner shaDow">
            <h4>
                이번주 인기 주류 <span>TOP10</span>
            </h4>
            <div className="alcohol_list">
                <Swiper
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    breakpoints={{
                        600: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        1650: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <SwiperSlide>
                        <span className="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div className="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">9 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <span class="rankedIn">1 </span>
                        <Link id="<?= $acTop10['acId'] ?>" to="/">
                            <img src={card5} alt="<?= $acTop10['acName'] ?>" />
                            <div class="title_hover">
                                <p>['acName']</p>
                                <span>acTop10['acCompany']</span>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default AcRank;
