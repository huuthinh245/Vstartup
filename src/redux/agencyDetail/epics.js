import 'rxjs';
import { combineEpics } from 'redux-observable';
import { agencyApi, handleError } from '../../utils/api';

import { GET_AGENCY_DETAIL, GET_AGENCY_DETAIL_SUCCESS, GET_AGENCY_DETAIL_FAILURE } from './actions';

const getAgencyDetail = actions$ =>
  actions$.ofType(GET_AGENCY_DETAIL).switchMap(async action => {
    try {
      const resp = await agencyApi.viewAgency(action.payload.id);
      return { type: GET_AGENCY_DETAIL_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_AGENCY_DETAIL_FAILURE, payload: error };
    }
  });

export const agencyDetailEpic = combineEpics(getAgencyDetail);
