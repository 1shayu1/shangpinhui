import axios from 'axios'

const swiper = axios.create({
    baseURL: "mock",
    timeout: 5000
});
swiper.interceptors.request.use((config) => {
    return config
});
swiper.interceptors.response.use((res) => {
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))//中止请求
})
export default swiper