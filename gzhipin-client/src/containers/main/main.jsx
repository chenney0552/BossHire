/*
* main component
*/
import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import {connect} from "react-redux";
import Cookies from 'js-cookie'
import {getRedirectTo} from '../../utils' 
import {getUser} from '../../redux/actions'

class Main extends Component {
    componentDidMount () {
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        
        if (userid && !_id) {
            // send async request to get user information
            this.props.getUser();
        }
    }

    render() {
        const userid = Cookies.get('userid');

        if (!userid) {
            return <Redirect to='/login'/>
        }

        const { user } = this.props;
        
        if (!user._id) {
            return null;
        } else {
            // if the user have _id, diplay related page
            // check the user type and header to calculate and get a redirected router path
            let path = this.props.location.pathname
            if (path === '/') {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path}/>
            }
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
    state => ({user: state.user}),
    {getUser}
)(Main);

/*
    achieve auto login
    1.) if userid is in cookie, send request to get User
    2.) if no userid in cookie, redirect to login page

    if already loggedin, request root path:
    1.) check the type and user to get a path and redirect
*/