/*
user avater selector component
*/

import React, { Component } from 'react';
import {List, Grid} from 'antd-mobile';
export default class HeaderSelector extends Component {
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

    render() {
        const listHeader = 'Please select avatar';
        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.headerList} columnNum={5}/>
            </List>
        );
    }
}