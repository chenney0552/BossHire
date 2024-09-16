/*
* contains multiple action creators
*/
import {reqRegister, reqLogin, reqUpdateUser, reqUser} from '../api'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from './action-types';

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
const resetUser = (msg) => ({type: RESET_USER, data: msg});

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

export const login = (user) => {
    const {username, password} = user
    if (!username) {
        return errorMsg('user name incomplete');
    }

    if (!password) {
         return errorMsg('password incomplete');
    }

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

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user);
        const result = response.data
        if (result.code === 0) { // success data
            dispatch(receiveUser(result.data))
        } else { // failed msg
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUser = () => {
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}