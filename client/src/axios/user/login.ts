import { error } from 'console';
import axios from "axios";

interface ResultData {
    success: boolean;
    accessToken: string,
    user: {
        myMemberId: number;
        youId: string;
        youName: string;
        youNick: string;
        youEmail: string;
        youBirth: string;
        youAddress: string;
    }
}

export const tryLogin = async (e: React.MouseEvent, youId: string, youPass: string) => {
    e.preventDefault();
    let body = {
        youId: youId,
        youPass: youPass
    }
    if (youId && youPass) {
        try {
            const result = await axios.post('/api/user/login', body);
            if (result.data.success) {
                alert('로그인 완료')
                localStorage.setItem('accessToken', result.data.accessToken);
                const user: ResultData['user'] = {
                    myMemberId: result.data.user.myMemberId,
                    youId: result.data.user.youId,
                    youName: result.data.user.youName,
                    youNick: result.data.user.youNick,
                    youEmail: result.data.user.youEmail,
                    youBirth: result.data.user.youBirth,
                    youAddress: result.data.user.youAddress,
                }
                return user;
            } else {
                alert('로그인 실패')
            }
        } catch (error) {
            console.log(error)
        }

    }
}
export default tryLogin