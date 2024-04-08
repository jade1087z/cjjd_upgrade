import axios from "axios";
import {  setUserImage } from "../../reducer/user";
import { store } from "../../reducer/store";

interface handleImageChange {
    e: React.ChangeEvent<HTMLInputElement>,
    myMemberId: number,
    setSelectedImage: (arg: string) => void,
}

export const handleImageChange = async ({ e, myMemberId,setSelectedImage }: handleImageChange) => {
    if (e.target.files && e.target.files[0]) {

        const file: File | null = e.target ? e.target.files[0] : null;
        console.log(file)
        if (!file) return;
        const formData = new FormData();
        formData.append('imgFile', file);
        console.log(formData)

        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        const result = await axios.patch(`/api/user/modify/${myMemberId}`, formData, config)
        if(result.status === 200) {
            setSelectedImage(result.data.imgFile)
            store.dispatch(setUserImage(result.data.imgFile));
        }
    }
}

export default handleImageChange