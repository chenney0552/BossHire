/*
 * 注册组件
 */
import React, { Component } from 'react';
import { NavBar, WingBlank, List, InputItem, WhiteSpace, Button, Radio } from 'antd-mobile';
import Logo from '../../components/logo/logo';
const ListItem = List.Item;

export default class Register extends Component {
    render() {
        return (
            <div>
                <NavBar>Boss &nbsp;Hire</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem>username</InputItem>
                        <WhiteSpace />
                        <InputItem type="password">password</InputItem>
                        <WhiteSpace />
                        <InputItem type="password">confirm</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>user type</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio>Candidate</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio>Boss</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary">Register</Button>
                        <WhiteSpace />
                        <Button>Existing User</Button>
                    </List>
                </WingBlank>
            </div>
        );
    }
}