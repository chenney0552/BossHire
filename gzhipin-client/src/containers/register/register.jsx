/*
 * 注册组件
 */
import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile';
import Logo from '../../components/logo/logo';
const ListItem = List.Item;

export default class Register extends Component {
    state = {
        username: '', // username
        password: '', // password
        password2: '', // confirm password
        userType: 'boss', // user type (candidate or boss)
    }

    register = () => {
        console.log(this.state);
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

    render() {
        return (
            <div>
                <NavBar>Boss &nbsp;Hire</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem placeholder="username" onChange={val => {this.handleChange('username', val)}}>username</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="password" type="password" onChange={val => {this.handleChange('password', val)}}>password</InputItem>
                        <WhiteSpace />
                        <InputItem placeholder="confirm password" type="password" onChange={val => {this.handleChange('password2', val)}}>confirm</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>user type</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType === 'candidate'} onChange={val => {this.handleChange('userType', 'candidate')}}>Candidate</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.userType === 'boss'} onChange={val => {this.handleChange('userType', 'boss')}}>Boss</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>Register</Button>
                        <WhiteSpace />
                        <Button onClick={() => this.props.history.push('/login')}>Existing User</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}