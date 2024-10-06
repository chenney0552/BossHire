/*
* contains multiple reducers functions: based on the old state and action, return a new state
*/
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ } from './action-types';
import {getRedirectTo} from '../utils'

// reducer for user
const initUser = {
    username: '', // user name
    type: '', // user type
    msg: '', // error info
    redirectTo: '' // redirect to router path
}

const initChat = {
    users:{}, // all the users in the chat key: userid, value: {username, header}
    chatMsgs: [], // all the chat messages realted with current user
    unReadCount: 0 // total unread message count
}

// reducer for chat state
function chat(state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users, chatMsgs} = action.data;
            return {users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === action.data.userid ? 1 : 0), 0)
            }
        case RECEIVE_MSG:
            const {chatMsg, userid} = action.data;
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === userid ? 1 : 0)
            }
        case MSG_READ:
            const {from, to, count} = action.data;
            return {
                users: state.users,
                chatMsgs: state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to === to && !msg.read) {
                        return {...msg, read: true}
                    } else {
                        return msg
                    }
                }),
                unReadCount: state.unReadCount - count
            }
        default:
            return state
    }
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data 是 user
            const {type, header} = action.data
            return {...state, ...action.data, redirectTo: getRedirectTo(type, header)}
        case ERROR_MSG: // data 是 msg
            return {...state, msg: action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

const initUserList = []
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    user,
    userList,
    chat
});


