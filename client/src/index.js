import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/misc/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/misc/welcome';
import LandlordDashboard from './components/landlord/LandlordDashboard';
import CanvasTenant from './components/tenant/CanvasTenant';
import CanvasLandlord from './components/landlord/CanvasLandlord';

import Store from './store';

import { AUTH_USER } from './actions/action_types';


ReactDOM.render(
  <Provider store={Store}>
  	<Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={CanvasTenant} />
        <Route path='signin' component={Signin}></Route>
        <Route path='signout' component={Signout}></Route>
        <Route path='signup' component={Signup}></Route>
        <Route path='feature' component={RequireAuth(Feature)}></Route>
      </Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
