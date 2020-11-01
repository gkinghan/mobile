import axios from 'axios'
import store from '@/store/index.js'
// 基于axios扩展配置
const http = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'

})

// axios 拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
