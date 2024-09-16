// 消息的路由容器组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../redux/actions';

class Message extends Component {
    render() {
        return (
            <div>Message</div>
        )
    }
}   

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Message)