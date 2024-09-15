/*
Boss information container component
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';
import { updateUser } from '../../redux/actions';

class LaobanInfo extends Component {

    state = {
        header: '',
        post: '',
        info: '',
        company: '',
        salary: '',
    }

    setHeader = (header) => {
        this.setState({ header });
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        });
    }

    save = () => {this.props.updateUser(this.state)}

    render() {
        const {header, type} = this.props.user

        if (header) { // 所有信息都已完成
            const path = type === 'candidate' ? '/dashen' : '/laoban';
            return <Redirect to={path} />
        }

        return (
            <div>
                <NavBar>Boss Information Edit</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem placeholder='Please input position' onChange={val => {this.handleChange('post', val)}}>Position</InputItem>
                <InputItem placeholder='Please input company'  onChange={val =>  {this.handleChange('company', val)}}>Company</InputItem>
                <InputItem placeholder='Please input salary'   onChange={val =>  {this.handleChange('salary', val)}}>Salary</InputItem>
                <TextareaItem title="Skills" rows={3} onChange={val => this.handleChange('info', val)} />
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        );
    }
}

export default connect(
    state => ({user: state.user}),
    {updateUser}
)(LaobanInfo);