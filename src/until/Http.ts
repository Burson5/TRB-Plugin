import axios from 'axios';
import apiConfig from '~/config/api';

let apiUrl = apiConfig.host;

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 60 * 3,
  baseURL: `${apiUrl}/`
});

instance.cancelToken = axios.CancelToken;

instance.interceptors.request.use(
  config => {
    // 增加固定请求参数
    let data = config.data;
    data = {
      ...data
    };

    if (process.env.LOG) {
      // 打印请求参数
      console.log('-----request logined------');
      console.log(config.url);
      console.log(JSON.stringify(data));
      console.log('----------------');
    }
    config.data = {
      data: data
    };

    // 增加请求头
    config.headers['content-type'] = 'application/json;charset=utf-8';
    config.headers['super-version'] = apiConfig.version;
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  response => {
    if (process.env.LOG) {
      // 打印结果
      console.warn('------response logined ------');
      console.log(response.config.url);
      console.log(response.data.data);
      console.warn('----------------');
    }
    return response.data.data;
  },
  error => {
    // 拦截错误
    if (error.response) {
      // switch (error.response.status) {
      // }
    }
    // console.log(error);
    const err = {
      ...error,
      ...error.response
    };
    return Promise.reject(err); //
  }
);
export default instance;
