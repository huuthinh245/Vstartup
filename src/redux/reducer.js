import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { reducer as formReducer } from 'redux-form';

import { authReducer } from './auth/reducer';
import { AppNavigator } from '../navigators/Root';
import { listRealtyReducer } from './listRealty/reducer';
import { realtyDetailReducer } from './realtyDetail/reducer';
import { listKeywordReducer } from './listKeyword/reducer';

const navReducer = createNavigationReducer(AppNavigator);

export const reducers = combineReducers({
  nav: navReducer,
  form: formReducer,
  auth: authReducer,
  listRealty: listRealtyReducer,
  realtyDetail: realtyDetailReducer,
  listKeyword: listKeywordReducer
});
