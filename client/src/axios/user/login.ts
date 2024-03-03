import { error } from 'console';
import axios from "axios";

interface ResultData {
    success: boolean;
    accessToken: string,
    user: {
        youId: string;
        youPass: string;
        youName: string;
        youNick: string;
        accessToken: string;
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
                    youId: result.data.user.youId,
                    youPass: result.data.user.youPass,
                    youName: result.data.user.youName,
                    youNick: result.data.user.youNick,
                    accessToken: result.data.accessToken
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