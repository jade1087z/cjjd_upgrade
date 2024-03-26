import axios from "axios"
import { alcohol } from "../../../../../server/interface/acInterface/ac.Interface"

interface acGoodBtnProps {
    e: React.MouseEvent<SVGSVGElement> | React.MouseEvent<HTMLButtonElement>,
    params: number | string | undefined,
    myMemberId: number,
    btnLike: boolean,
    setBtnLike: (liked: boolean) => void,
    setAcView: (arg: alcohol) => void | null
}

export const acGoodBtn = async ({ e, params, myMemberId, btnLike, setBtnLike, setAcView }:acGoodBtnProps) => {
    e.preventDefault()
    let body = {
        myMemberId: myMemberId,
        isLiked: btnLike
    }
    console.log(btnLike, 'btnLike')
    if (myMemberId) {
        await axios.post<{ success: boolean, result: alcohol }>(`/api/acList/acLike/${params}`, body).then((res) => {
            if (res.data.success) {
                setBtnLike(!btnLike)
                const postData = {
                    ...res.data.result,
                }
                setAcView(postData);
                console.log(res.data.result)
            }
        }).catch((err) => {
            console.log(err)
        })
    } else {
        alert('로그인 후 이용해주세요.')
    }
}

export default acGoodBtn