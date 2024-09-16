// 个人中心的路由容器组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../redux/actions';

class Personal extends Component {
    render() {
        return (
            <div>Personal</div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Personal)