import { combineEpics } from 'redux-observable';

import { listEpic } from './preload/epics';
import { authEpic } from './auth/epics';
import { mapRealtyEpic } from './mapRealty/epics';
import { searchRealtyEpic } from './searchRealty/epics';
import { realtyDetailEpic } from './realtyDetail/epics';
import { listHistoryEpic } from './listHistory/epics';
import { listFavoriteEpic } from './listFavorite/epics';
import { listAgencyEpic } from './listAgency/epics';
import { agencyDetailEpic } from './agencyDetail/epics';
import { projectDetailEpic } from './projectDetail/epics';
import { agencyRealtyEpic } from './agencyRealty/epics';
import { agencyProjectEpic } from './agencyProject/epics';
import { contactEpic } from './contact/epics';

export default (epics = combineEpics(
  listEpic,
  authEpic,
  mapRealtyEpic,
  searchRealtyEpic,
  realtyDetailEpic,
  listHistoryEpic,
  listFavoriteEpic,
  listAgencyEpic,
  agencyDetailEpic,
  projectDetailEpic,
  agencyRealtyEpic,
  agencyProjectEpic,
  contactEpic
));
