/*
* contains multiple reducers functions: based on the old state and action, return a new state
*/
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER } from './action-types';
import {getRedirectTo} from '../utils'

// reducer for user
const initUser = {
    username: '', // user name
    type: '', // user type
    msg: '', // error info
    redirectTo: '' // redirect to router path
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

export default combineReducers({
    user
});


