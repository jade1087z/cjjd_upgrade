import axios from "axios"

export const getUserInfo = async (token: string) => {
    try {
        const response = await axios.get('/api/user/info', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (response.status === 200) {
            return response.data.userInfo;
        } else {
            throw new Error('user not authenticated');
        }
    } catch (error) {
        console.log(error)
        return null
    }


}

export default getUserInfo