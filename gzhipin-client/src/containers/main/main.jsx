/*
* main component
*/
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import DashenInfo from '../dashen-info/dashen-info';
import LaobanInfo from '../laoban-info/laoban-info';
import { connect } from "react-redux";
import Cookies from 'js-cookie';
import { getRedirectTo } from '../../utils';
import { getUser } from '../../redux/actions';
import Dashen from '../dashen/dashen';
import Laoban from '../laoban/laoban';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import { NavBar } from 'antd-mobile';
import NavFooter from '../../components/nav-footer/nav-footer';

class Main extends Component {
    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
            path: '/laoban', // 路由路径
            component: Laoban,
            title: '老板列表',
            icon: 'dashen',
            text: '老板',
        },
        {
            path: '/dashen', // 路由路径
            component: Dashen,
            title: '大神列表',
            icon: 'laoban',
            text: '大神',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '个人',
        }
    ];

    componentDidMount() {
        const userid = Cookies.get('userid');
        const { _id } = this.props.user;

        if (userid && !_id) {
            // send async request to get user information
            this.props.getUser();
        }
    }

    render() {
        const userid = Cookies.get('userid');

        if (!userid) {
            return <Redirect to='/login' />;
        }

        const { user } = this.props;

        if (!user._id) {
            return null;
        } else {
            // if the user have _id, display related page
            // check the user type and header to calculate and get a redirected router path
            let path = this.props.location.pathname;
            if (path === '/') {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path} />;
            }
        }

        const {navList} = this;
        const path = this.props.location.pathname;
        const currentNav = navList.find(nav => nav.path === path);

        if(currentNav) {
            // check which router need to hide
            if (user.type === 'laoban') {
                navList[1].hide = true;
            } else {
                navList[0].hide = true;
            }
        }

        return (
            <div>
                {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => (
                            <Route key={nav.path} path={nav.path} component={nav.component} />
                        ))
                    }
                    <Route path='/dasheninfo' component={DashenInfo} />
                    <Route path='/laobaninfo' component={LaobanInfo} />
                    <Route component={NotFound} />
                </Switch>
                {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    { getUser }
)(Main);

/*
    achieve auto login
    1.) if userid is in cookie, send request to get User
    2.) if no userid in cookie, redirect to login page

    if already loggedin, request root path:
    1.) check the type and user to get a path and redirect
*/