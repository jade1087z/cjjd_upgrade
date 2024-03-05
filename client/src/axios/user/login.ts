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
            if (result.status === 200) {
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
                window.location.href= '/';
                return user;
            }
        } catch (error) {
            if (error.response && error.response.status) {
                if (error.response.status === 403) {
                    alert('비밀번호를 확인해주세요.')
                } else if (error.response.status === 404) {
                    alert('해당 유저 정보를 찾을 수 없습니다.')
                } else if(error.response.status === 500){
                    alert('해당 유저 정보를 찾을 수 없습니다.')
                    console.log(error);
                }
            } 
        }

    }
}
export default tryLogin