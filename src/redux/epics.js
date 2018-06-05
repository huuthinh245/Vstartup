import { combineEpics } from 'redux-observable';

import { listEpic } from './preload/epics';
import { authEpic } from './auth/epics';
import { listRealtyEpic } from './listRealty/epics';
import { realtyDetailEpic } from './realtyDetail/epics';
import { listHistoryEpic } from './listHistory/epics';
import { myRealtyEpic } from './myRealty/epics';
import { listFavoriteEpic } from './listFavorite/epics';
import { listAgencyEpic } from './listAgency/epics';
import { agencyDetailEpic } from './agencyDetail/epics';
import { listProjectEpic } from './listProject/epics';
import { projectDetailEpic } from './projectDetail/epics';
import { agencyRealtyEpic } from './agencyRealty/epics';
import { agencyProjectEpic } from './agencyProject/epics';
import { contactEpic } from './contact/epics';

export default (epics = combineEpics(
  listEpic,
  authEpic,
  listRealtyEpic,
  realtyDetailEpic,
  listHistoryEpic,
  myRealtyEpic,
  listFavoriteEpic,
  listAgencyEpic,
  agencyDetailEpic,
  listProjectEpic,
  projectDetailEpic,
  agencyRealtyEpic,
  agencyProjectEpic,
  contactEpic
));
