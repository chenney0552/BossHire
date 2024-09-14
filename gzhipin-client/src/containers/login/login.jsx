/*
 * 注册组件
 */
import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button} from 'antd-mobile';
import Logo from '../../components/logo/logo';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../redux/actions';
const ListItem = List.Item;

class Login extends Component {
    state = {
        username: '', // username
        password: '', // password
    }

    login = () => {
        this.props.login(this.state);
    }

    handleChange = (name, val) => {
        // 处理输入字段变化的方法
        // name: 字段名称 (例如: 'username', 'password')
        // val: 字段的新值
        // 使用setState更新组件的状态
        this.setState({
            [name]: val
        });
    }

    toRegister = () => {
        this.props.history.replace('/register');
    }

    render() {
        const {msg, redirectTo} = this.props.user;
        if (redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>Boss &nbsp;Hire</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace />
                        <InputItem placeholder="username" onChange={val => {this.handleChange('username', val)}}>username</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="password" type="password" onChange={val => {this.handleChange('password', val)}}>password</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.login}>Login</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>No Account</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login);