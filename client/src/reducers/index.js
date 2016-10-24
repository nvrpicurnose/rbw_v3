import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import landlordReducer from './landlord_reducer'
import tenantReducer from './tenant_reducer'
import contentReducer from './content_reducer'
import popReducer from './popup_reducer'
import searchReducer from './search_reducer'

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  landlord: landlordReducer,
  tenant: tenantReducer,
  content: contentReducer,
  popup: popReducer,
  searchForm: searchReducer
});

export default rootReducer;
