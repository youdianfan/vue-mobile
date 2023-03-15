import axios from 'axios'

// 创建axios实例
const service = axios.create({
	baseURL: process.env.VUE_APP_API, // api的base_url
	// timeout: 30000 // 请求超时时间
})

//添加一个请求拦截器
service.interceptors.request.use(config => {
	return config;
}, error => {
	//Do something with request error
	return Promise.reject(error);
})

//添加一个响应拦截器
service.interceptors.response.use(res => {
	return res;
}, error => {
	return Promise.reject(error);
})

export default service
