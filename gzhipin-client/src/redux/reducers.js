/*
* contains multiple reducers functions: based on the old state and action, return a new state
*/
import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG } from './action-types';

// reducer for user
const initUser = {
    username: '', // user name
    type: '', // user type
    msg: '', // error info
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: // data 是 user
            return {...state, ...action.data, msg: ''}
        case ERROR_MSG: // data 是 msg
            return {...state, msg: action.data}
        default:
            return state
    }
}

export default combineReducers({
    user
});