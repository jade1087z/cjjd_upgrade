import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { DrinkList } from "../../../interface/post/acList.interface";
import ranking from "../../../axios/acList/list/rankingAc";
import { useQuery } from "@tanstack/react-query";
import { AcRankSkeleton } from "../../../skeleton/ac/AcSkeleton";

const AcRank: React.FC = () => {

    // const [acRank, setAcRank] = useState<DrinkList[]>([]);

    // const fetchList = async () => {
    //     const result: DrinkList[] = await ranking()
    //     setAcRank(result)
    // }
    // useEffect(() => {
    //     fetchList();
    // }, [])

    const { data, error, isFetching } = useQuery<DrinkList[], Error>({ queryKey: ['aclist'], queryFn: ranking })
    if (error) return <div>An error occurred</div>;
   
    return (
        <div className="ranking_list boxStyle roundCorner shaDow">
            <Link to={'/aclist'}><h4>이번주 인기 주류 <span>TOP10</span></h4></Link>

            <div className="alcohol_list">
                <Swiper
                    autoplay={{ delay: 3000, disableOnInteraction: false, }}
                    modules={[Autoplay]}
                    breakpoints={{ 500: { slidesPerView: 2, spaceBetween: 10, }, 600: { slidesPerView: 3, spaceBetween: 10, }, 1200: { slidesPerView: 4, spaceBetween: 10, }, 1650: { slidesPerView: 5, spaceBetween: 10, }, }}>

                    {isFetching ? (
                        <AcRankSkeleton />
                    ) : (
                        data && data.map((swip, key) => (
                            <SwiperSlide key={key}>
                                <span className="rankedIn">{key + 1}</span>
                                <Link to={`/acview/${swip.acId}`}>
                                    <img src={swip.acImgPath} alt='' />
                                    <div className="title_hover">
                                        <p>{swip.acName}</p>
                                        <span>acTop10 {swip.acCompany}</span>
                                    </div>
                                </Link>
                            </SwiperSlide>))
                    )}

                </Swiper>
            </div>
        </div>
    );
};

export default AcRank;
