import axios, {AxiosInstance} from "axios";

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5050/api',
    timeout: 10000,

});

export default instance