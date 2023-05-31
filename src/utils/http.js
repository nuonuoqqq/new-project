import axios from 'axios'

const MOCK_URL = 'http://127.0.0.1:4523/m1/1378019-0-default'

const TEST_URL = 'http://127.0.0.1:3000/api'



const http = axios.create({
    baseURL: TEST_URL,
    timeout: 1000,
    // headers: {
    //     Authorization: 'APPCODE e36e4f85632f48d8bf3a4b12e260877e'
    // }
})

// 拦截器
http.interceptors.request.use((config) => {
    if (config.url === '/login') {
        return config;
    }
    config.headers['token'] = sessionStorage.getItem('token')
    console.log('interceptors', config)
    return config;
})

export {
    http
}