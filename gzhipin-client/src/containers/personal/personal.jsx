// 个人中心的路由容器组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../redux/actions';
import { List, Result, WhiteSpace, Button, Modal, WingBlank } from 'antd-mobile';
import Cookies from 'js-cookie';
import {resetUser} from '../../redux/actions';
const Item = List.Item
const Brief = Item.Brief


class Personal extends Component {
    handleLogout = () => {
        Modal.alert('Log out', 'Are you sure you want to log out?', [
            {text: 'Cancel', onPress: () => console.log('Cancel')},
            {text: 'Confirm', onPress: () => 
                {
                    // clear the cookie
                    Cookies.remove('userid');
                    
                    // clear the user info in redux
                    this.props.resetUser();
                }}
        ])
    }

    render() {
        const {username, header, company, post, info, salary} = this.props.user;
        const avatar = header.match(/avatar(\d+)/);
        const avatarNumber = avatar ? avatar[1] : null;
        return (
            <div>
                <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                <Result
                    img={<img src={require(`../../assets/images/avatar${avatarNumber}.png`)} alt='avatar' style={{width: 50, height: 50}}/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={() => 'Related Information'}>
                    <Item multipleLine>
                        <Brief>Hire for Position: {post}</Brief>
                        <Brief>Job Description: {info}</Brief>
                        <Brief>Offer Salary: {salary}</Brief>
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning' onClick={this.handleLogout}>Log out</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser, resetUser}
)(Personal)