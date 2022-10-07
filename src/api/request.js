import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
const request = axios.create({
    baseURL: "http://gmall-h5-api.atguigu.cn/api",
    timeout: 5000
});
request.interceptors.request.use((config) => {
    if(store.state.detail.uuid){
        config.headers.userTempId = store.state.detail.uuid
    }
    if(localStorage.getItem('TOKEN')){
        config.headers.token = localStorage.getItem('TOKEN')
    }else if(sessionStorage.getItem('TOKEN')){
        config.headers.token = sessionStorage.getItem('TOKEN')
    }
    NProgress.start();
    return config
});
request.interceptors.response.use((res) => {
    NProgress.done();
    return res.data
}, (error) => {
    return Promise.reject(new Error('faile'))//中止请求
})
export default request