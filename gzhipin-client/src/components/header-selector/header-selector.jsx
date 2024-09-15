/*
user avater selector component
*/

import React, { Component } from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

    static PropTypes = {
        setHeader: PropTypes.func.isRequired
    }

    state = {
        icon: null
    }

    constructor(props) {
        super(props);
        // prepare to render all the avatar
        this.headerList = [];
        for (let i = 0; i < 20; i++) {
            this.headerList.push({
                text: 'avatar' + (i + 1),
                icon: require(`./images/头像${i + 1}.png`)
            });
        }
    }

    handleClick = ({text, icon}) => {
        // update current component state
        this.setState({icon});

        // update parent component
        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state
        const listHeader = !icon ? 'Please select avatar' : (<div>Selected: <img src={icon}/></div>)
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} columnNum={5} onClick={this.handleClick}/>
            </List>
        );
    }
}