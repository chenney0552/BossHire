import React from 'react';
import ReactDOM from 'react-dom';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main';
import { HashRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={Main} />
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);