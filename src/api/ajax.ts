/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数的返回值是promise对象
 */

import axios from 'axios';
import { message } from 'antd';

export default function ajax(url: string, data: any = {}, type: string = 'GET') {

  return new Promise((resolve, reject) => {
    let promise;

    if (type === 'GET') { // 发送GET请求
      promise = axios.get(url, { // 配置对象
        params: data, // 指定请求参数
      });
    } else { // 发送POST请求
      promise = axios.post(url, data);
    }

    promise.then((response) => {
      resolve(response.data);
    }).catch((error) => {
      // reject(error);
      message.error('请求出错了：' + error.message);
    })
  })
}