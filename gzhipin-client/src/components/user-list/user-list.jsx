/*
    show user list component
*/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {WingBlank, WhiteSpace, Card} from 'antd-mobile';
import { withRouter } from 'react-router-dom';

const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props;
        return (
            <WingBlank style={{marginBottom: 50, marginTop: 50}}>
                <WhiteSpace/>
                {userList.map((user, index) => (
                    <Card key={user._id} onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                        <Header title={user.username} 
                                thumb={require(`../../assets/images/头像${index + 1}.png`)}/>
                        <Body>
                            <div>position: {user.post}</div>
                            {user.company ? <div>company: {user.company}</div> : null}
                            {user.salary ? <div>salary: {user.salary}</div> : null}
                            {user.info ? <div>info: {user.info}</div> : null}
                        </Body>
                    </Card>
                ))}
            </WingBlank>
        )
    }
}

export default withRouter(UserList);