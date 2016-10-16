import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/misc/feature';
import RequireAuth from './components/auth/require_auth';
import Welcome from './components/misc/welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/action_types';

import LandlordDashboard from './components/landlord/LandlordDashboard';
import CanvasTenant from './components/tenant/CanvasTenant';
import CanvasLandlord from './components/landlord/CanvasLandlord';

// reduxThunk allows us to store functions inside our actions (instead of only objects)
// recall that all actions will flow through each middleware until it reaches the end to be passed to reducers
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// create an instance of the redux store with all our reducers
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
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
