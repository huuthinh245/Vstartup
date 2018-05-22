import { combineEpics } from 'redux-observable';

import { authEpic } from './auth/epics';
import { listRealtyEpic } from './listRealty/epics';
import { realtyDetail } from './realtyDetail/epics';

export default (epics = combineEpics(authEpic, listRealtyEpic, realtyDetail));
