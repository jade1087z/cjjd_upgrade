import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton';
import { SwiperSlide } from 'swiper/react';

// acListSkeleton 함수에서 필요한 영역의 스켈레톤을 불러와 사용
export const AcListSkeleton = () => {
    return (
        <ul>
            {Array(20).fill(null).map((_, key) => (
                <li className="boxStyle roundCorner shaDow" key={key}>
                    <div>
                        <div className="">
                            <Skeleton width={211} height={211} />
                        </div>
                        <div className="item_info" style={{marginTop: "0.5rem", marginBottom: 0}}>
                            <Skeleton width={211} height={15} />
                            <Skeleton width={211} height={15} />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

// acRankSkeleton 함수에서 필요한 영역의 스켈레톤을 불러와 사용
export const AcRankSkeleton = () => {
    return (
        <Fragment>
            {Array(10).fill(null).map((_, key) => (
                <SwiperSlide key={key} style={{minHeight: "180px"}}>
                    <Skeleton width={180} height={180}/>
                </SwiperSlide>
            ))}
        </Fragment>
    );
}

export default AcListSkeleton;  // 기본 내보내기는 필요에 따라 수정