// create a component for the nav footer
import React from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
const Item = TabBar.Item;

// use non router component to get router component api
// withRoute()
class NavFooter extends React.Component {

    static propTypes = {
        navList: PropTypes.array.isRequired
    }

    render() {
        const {navList} = this.props;
        const path = this.props.location.pathname;
        return (
            <TabBar>
                {navList.map(nav => (
                    <Item key={nav.path} 
                          title={nav.text} 
                          icon={{uri: require(`./images/${nav.icon}.png`)}} 
                          selectedIcon={{uri: require(`./images/${nav.icon}-selected.png`)}} 
                          selected={path === nav.path} 
                          onPress={() => {
                            this.props.history.replace(nav.path);
                        }}
                    />
                ))}
            </TabBar>
        )
    }  
}

// pass the router api to NavFooter
// history, location, match
export default withRouter(NavFooter);