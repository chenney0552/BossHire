/*
Boss information container component
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';

class LaobanInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>Boss Information Edit</NavBar>
                <HeaderSelector />
                <InputItem placeholder='Please input position'>Position</InputItem>
                <InputItem placeholder='Please input company' >Company</InputItem>
                <InputItem placeholder='Please input salary'  >Salary</InputItem>
                <TextareaItem title="Skills" rows={3} onChange={val => this.handleChange('info', val)} />
                <Button type='primary'>Save</Button>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(LaobanInfo);