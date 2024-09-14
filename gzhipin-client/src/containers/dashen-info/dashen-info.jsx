/*
    Candidate information container component
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';

class DashenInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>Candidate Information Edit</NavBar>
                <HeaderSelector />
                <InputItem placeholder='Please input position'>Position</InputItem>
                <TextareaItem title="Introduce" rows={3} onChange={val => this.handleChange('info', val)} />
                <Button type='primary'>Save</Button>
            </div>
        );
    }
}

export default connect(
    state => ({}),
    {}
)(DashenInfo);
