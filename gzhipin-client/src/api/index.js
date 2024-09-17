/*
    包含了n个函数请求的接口
*/
import ajax from './ajax'

// 注册接口
export const reqRegister = (user) => ajax('/register', user, 'POST')

// 登陆接口
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 更新接口
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

// 获取用户信息
export const reqUser = () => ajax('/user')

// 获取用户列表
export const reqUserList = (type) => ajax('/userlist', {type})