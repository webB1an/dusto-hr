import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000, // request timeout
  withCredentials: true // 需要登录权限的要带cookie
})
// request interceptor
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use(
  response => {
    return Promise.resolve(response.data || {})
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
