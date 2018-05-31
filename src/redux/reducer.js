import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import { cityReducer, optionsReducer } from './preload/reducer';
import { authReducer } from './auth/reducer';
import { AppNavigator } from '../navigators/Root';
import { listRealtyReducer } from './listRealty/reducer';
import { realtyDetailReducer } from './realtyDetail/reducer';
import { listHistoryReducer } from './listHistory/reducer';
import { myRealtyReducer } from './myRealty/reducer';
import { listFavoriteReducer } from './listFavorite/reducer';
import { listAgencyReducer } from './listAgency/reducer';
import { agencyDetailReducer } from './agencyDetail/reducer';
import { listProjectReducer } from './listProject/reducer';
import { projectDetailReducer } from './projectDetail/reducer';
import { agencyRealtyReducer } from './agencyRealty/reducer';

const navReducer = createNavigationReducer(AppNavigator);

export const reducers = combineReducers({
  nav: navReducer,
  city: cityReducer,
  options: optionsReducer,
  auth: authReducer,
  listRealty: listRealtyReducer,
  realtyDetail: realtyDetailReducer,
  listHistory: listHistoryReducer,
  myRealty: myRealtyReducer,
  listFavorite: listFavoriteReducer,
  listAgency: listAgencyReducer,
  agencyDetail: agencyDetailReducer,
  listProject: listProjectReducer,
  projectDetail: projectDetailReducer,
  agencyRealty: agencyRealtyReducer
});
