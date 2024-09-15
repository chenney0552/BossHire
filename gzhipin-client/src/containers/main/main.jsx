/*
* main component
*/
import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import {connect} from "react-redux";

class Main extends Component {
    render() {
        // check if user is logged in, if not, redirect to login page
        const {user} = this.props

        if (!user._id) {
            return <Redirect to='/login'/>
        }

        return (
            <div>
                <Switch>
                    <Route path='/dasheninfo' component={DashenInfo} />
                    <Route path='/laobaninfo' component={LaobanInfo} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user})
)(Main);