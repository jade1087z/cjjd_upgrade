import axios from "axios"

export const uploadFile = async ({formData}) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data'}
        }
        const result = await axios.post('/api/upload/post', formData, config)
        console.log(result)
        if(result.data && result.data.url){
            console.log(result.data.url)
            const {content, mimetype} = result.data.url;
            const url = `data:${mimetype};base64,${content}`
            console.log(url)
            return url
        } 
    } catch (error) {
        console.log(error)
    }

}
export default uploadFile