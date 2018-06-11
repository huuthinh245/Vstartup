import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import { cityReducer, optionsReducer } from './preload/reducer';
import { authReducer } from './auth/reducer';
import { AppNavigator } from '../navigators/Root';
import { mapRealtyReducer } from './mapRealty/reducer';
import { searchRealtyReducer } from './searchRealty/reducer';
import { realtyDetailReducer } from './realtyDetail/reducer';
import { listHistoryReducer } from './listHistory/reducer';
import { listFavoriteReducer } from './listFavorite/reducer';
import { listAgencyReducer } from './listAgency/reducer';
import { agencyDetailReducer } from './agencyDetail/reducer';
import { projectDetailReducer } from './projectDetail/reducer';
import { agencyRealtyReducer } from './agencyRealty/reducer';
import { agencyProjectReducer } from './agencyProject/reducer';
import { contactsReducer } from './contact/reducer';

const navReducer = createNavigationReducer(AppNavigator);

export const reducers = combineReducers({
  nav: navReducer,
  city: cityReducer,
  options: optionsReducer,
  auth: authReducer,
  mapRealty: mapRealtyReducer,
  searchRealty: searchRealtyReducer,
  realtyDetail: realtyDetailReducer,
  listHistory: listHistoryReducer,
  listFavorite: listFavoriteReducer,
  listAgency: listAgencyReducer,
  agencyDetail: agencyDetailReducer,
  projectDetail: projectDetailReducer,
  agencyRealty: agencyRealtyReducer,
  agencyProject: agencyProjectReducer,
  listContact: contactsReducer
});
