/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax';
import jsonp from 'jsonp';
import { message } from 'antd';
const BASE = ''

// 登录
export const reqLogin = (username: string, password: string) => ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user: string) => ajax('/manage/user/add', user, 'POST');

// 获取一级/二级分类的列表
export const reqCategorys = (parentId: string) => ajax(BASE + '/manage/category/list', {parentId});

// 添加分类
export const reqAddCategorys = (categoryName: string, parentId: string) => ajax(BASE + '/manage/category/add', { categoryName, parentId }, 'POST');

// 更新分类
export const reqUpdateCategorys = ({categoryName, categoryId}: any) => ajax(BASE + '/manage/category/update', { categoryName, categoryId }, 'POST');

/**
 * 通过jsonp请求获取天气信息
 */
export function reqWeather(city: string) {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  
  return new Promise((resolve, reject) => {
    jsonp( url, {
      param: 'callback',
    }, (error: any, response: any) => {
      if (!error && response.status === 'success') {
        const { dayPictureUrl, weather } = response.results[0].weather_data[0];
        resolve({dayPictureUrl, weather})
      } else {
        message.error('获取天气失败');
      }
    })
    
  })
}
