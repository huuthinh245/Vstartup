import { combineEpics } from 'redux-observable';

import { listEpic } from './preload/epics';
import { authEpic } from './auth/epics';
import { listRealtyEpic } from './listRealty/epics';
import { realtyDetail } from './realtyDetail/epics';
import { listKeywordEpic } from './listKeyword/epics';

export default (epics = combineEpics(
  listEpic,
  authEpic,
  listRealtyEpic,
  realtyDetail,
  listKeywordEpic
));
