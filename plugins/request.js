import axios from 'axios'

export const request = axios.create({
    baseURL: 'https://api.realworld.io',
});

request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  })

export default ({ store }) => {
    // // 添加请求拦截器
    request.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        if ((config.data && config.data.isToken)) {
            const token = store.state.user.user && store.state.user.user.token;
            if (token)  config.headers.authorization = `Token ${token}`;
            delete config.data.isToken;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
}
