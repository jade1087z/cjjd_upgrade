import axios from "axios"

export const uploadFile = async (formData) => {
    console.log(formData)
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }
        const result = await axios.post('/api/upload/post', formData, config)
        console.log(result)
        if(result.data && result.data.url){
            console.log(result.data.url, 'url')
            return result.data.url
        } 
    } catch (error) {
        console.log(error)
    }

}
export default uploadFile