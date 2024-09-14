/*
* contains multiple action creators
*/
import {reqRegister, reqLogin} from '../api'
import { AUTH_SUCCESS, ERROR_MSG } from './action-types';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});

export const register = (user) => {
    const {username, password, password2, type} = user

    if (!username) {
        return errorMsg('user name incomplete');
    }
    
    if (!password) {
        return errorMsg('password incomplete');
    }

    if (!password2) {
        return errorMsg('password2 incomplete');
    }
    
    if (!type) {
        return errorMsg('type incomplete');
    }

    if(password !== password2) {
        return errorMsg('the two passwords does not match');
    }

    return async dispatch => {
        const response = await reqRegister({username, password, type});
        const result = response.data;
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data));
        } else { // 失败
            dispatch(errorMsg(result.msg));
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        // send login async ajax
        const response = await reqLogin(username, password);
        const result = response.data;
        if (result.code === 0) { // 成功
            dispatch(authSuccess(result.data));
        } else { // 失败
            dispatch(errorMsg(result.msg));
        }
    }
}