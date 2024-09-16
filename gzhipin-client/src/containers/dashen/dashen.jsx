// 大神的主界面路由容器组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../redux/actions';

class Dashen extends Component {
    render() {
        return (
            <div>Dashen</div>
        )
    }
}   


export default connect(
    state => ({user: state.user}),
    {getUser}
)(Dashen)