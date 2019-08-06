/**
 * 包含应用中所有接口请求函数的模块
 */
import ajax from './ajax';

// 登录
export const reqLogin = (username: string, password: string) => ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user: string) => ajax('/manage/user/add', user, 'POST');

