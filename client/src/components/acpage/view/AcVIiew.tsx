import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { alcohol } from "../../../../../server/interface/acInterface/ac.Interface";
import { RouteParams } from "../../../interface/post/postInterface";
import { acDetail } from "../../../axios/acList/view/acDetail";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducer/store";
import TopData from "./data/TopData";
import BottomData from "./data/BottomData";
import CommentArea from "../../comment/CommentArea";
import CmmentWrite from "../../comment/CmmentWrite";

const AcVIiew: React.FC = () => {
    const user = useSelector((state: RootState) => state.user)
    const myMemberId = user?.myMemberId
    const { acId } = useParams<RouteParams>();
    const params: number | string | undefined = acId === undefined ? undefined : (isNaN(Number(acId)) ? acId : Number(acId));

    const [acView, setAcView] = useState<alcohol | null>()
    const [btnLike, setBtnLike] = useState<boolean>(false)
    const [commentUpdate, setCommentUpdate] = useState<boolean>(false)
    const [type, setType] = useState<string>('ac')


    useEffect(() => {
        let isMounted = true
        const fetchAc = async () => {
            const result: alcohol | undefined = await acDetail({ params, myMemberId, setBtnLike });
            if (result && isMounted) {
                try {
                    setAcView(result);
                } catch (error) {
                    console.error('Error formatting date:', error);
                }
            }
        };
        fetchAc();
        return () => { isMounted = false }
    }, [myMemberId])


    return (
        <>
            <React.Suspense fallback={<div className="loading">Loading...</div>}>
                <TopData acView={acView} params={params} myMemberId={myMemberId} acId={acId} btnLike={btnLike} setBtnLike={setBtnLike} setAcView={setAcView} />
                <BottomData acView={acView} />
            </React.Suspense>
            <CommentArea params={params} commentUpdate={commentUpdate} myMemberId={myMemberId} setCommentUpdate={setCommentUpdate} type={type}/>
            <CmmentWrite myMemberId={myMemberId} params={params} setCommentUpdate={setCommentUpdate} type={type}/>
           
        </>
    );
};

export default AcVIiew;
