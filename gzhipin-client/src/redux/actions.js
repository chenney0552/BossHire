/*
* contains multiple action creators
*/
import {reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList, reqChatMsgList} from '../api'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST } from './action-types';
import io from 'socket.io-client'

const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user});
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg});
const receiveUser = (user) => ({type: RECEIVE_USER, data: user});
export const resetUser = (msg) => ({type: RESET_USER, data: msg});
export const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList});

// use a singleton socket
// 1. check if socket is already connected
// 2. if not, connect to the server
function initIO() {
    if (!io.socket) {
        const socket = io('ws://localhost:4000');
        io.socket = socket;
        io.socket.on('receiveMsg', function(chatMsg) {
            console.log('receiveMsg', chatMsg);
        });
    }
}

export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('sendMsg', {from, to, content});
        io.socket.emit('sendMsg', {from, to, content});
    }
}

// get msg list
async function getMsgList(dispatch) {
    console.log('getMsgList');
    initIO();
    const response = await reqChatMsgList();
    const result = response.data;
    if (result.code === 0) {
        const {users, chatMsgs} = result.data;
        dispatch(receiveMsgList({users, chatMsgs}))
    }
}

const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
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
            getMsgList(dispatch);
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
            getMsgList(dispatch);
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
    console.log('getUser called');
    return async dispatch => {
        const response = await reqUser();
        const result = response.data;
        if (result.code === 0) {
            getMsgList(dispatch);
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type);
        const result = response.data;
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}