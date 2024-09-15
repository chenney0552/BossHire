/*
    Candidate information container component
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import HeaderSelector from '../../components/header-selector/header-selector';
import { updateUser } from '../../redux/actions';

class DashenInfo extends Component {
    state = {
        header: '',
        post: '',
        info: '',
    }

    setHeader = (header) => {
        this.setState({ header });
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        });
    }

    save = () => {
        this.props.updateUser(this.state)
    }

    render() {
        const {header, type} = this.props.user
        if (header) { // 如果信息已经完整
            const path = type === 'boss' ? '/laoban' : '/dashen'; // 重定向到相关页面
            return <Redirect to={path} />
        }

        return (
            <div>
                <NavBar>Candidate Information Edit</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='Please input position' onChange={val => {this.handleChange('post', val)}}>position</InputItem>
                <TextareaItem title='introduce' rows={3} onChange={val => this.handleChange('info', val)}/>
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(DashenInfo);