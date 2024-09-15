/*
    Candidate information container component
*/
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';

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

    save = () => {console.log(this.state);}

    render() {
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
    state => ({}),
    {}
)(DashenInfo);
