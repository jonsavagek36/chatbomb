import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Login from './components/Login';
import Setup from './components/Setup';
import App from './components/App';
import Requests from './component/Requests';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Login} />
    <Route path="/setup" component={Setup} />
    <Route path="/chatbomb" component={App} />
    <Route path="/requests" component={Requests} />
  </Router>,
  document.getElementById('app')
);
