import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import landlordReducer from './landlord_reducer'
import mapviewReducer from './mapview_reducer'
import contentReducer from './content_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  landlord: landlordReducer,
  content: contentReducer
});

export default rootReducer;
