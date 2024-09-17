// 个人中心的路由容器组件
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUser } from '../../redux/actions';
import { List, Result, WhiteSpace, Button } from 'antd-mobile';
const Item = List.Item
const Brief = Item.Brief


class Personal extends Component {
    render() {
        const {username, header, company, post, info, salary} = this.props.user;
        const avatar = header.match(/avatar(\d+)/);
        const avatarNumber = avatar ? avatar[1] : null;
        return (
            <div>
                <Result
                    img={<img src={require(`../../assets/images/头像${avatarNumber}.png`)} alt='avatar' style={{width: 50, height: 50}}/>}
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
                    <Button type='warning'>Log out</Button>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {getUser}
)(Personal)