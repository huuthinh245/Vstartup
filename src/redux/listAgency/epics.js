import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_AGENCY,
  GET_LIST_AGENCY_SUCCESS,
  GET_LIST_AGENCY_FAILURE,
  REFRESH_LIST_AGENCY,
  REFRESH_LIST_AGENCY_SUCCESS,
  REFRESH_LIST_AGENCY_FAILURE,
  LOAD_MORE_LIST_AGENCY,
  LOAD_MORE_LIST_AGENCY_SUCCESS,
  LOAD_MORE_LIST_AGENCY_FAILURE
} from './actions';
import { agencyApi, handleError } from '../../utils/api';

const getListAgencyEpic = actions$ =>
  actions$.ofType(GET_LIST_AGENCY).switchMap(async action => {
    try {
      const resp = await agencyApi.listAgency(action.payload);
      return { type: GET_LIST_AGENCY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_AGENCY_FAILURE, payload: error };
    }
  });

const loadMoreListAgencyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_AGENCY).switchMap(async action => {
    try {
      const resp = await agencyApi.listAgency(action.payload);
      return { type: LOAD_MORE_LIST_AGENCY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_LIST_AGENCY_FAILURE, payload: error };
    }
  });

const refreshListAgencyEpic = actions$ =>
  actions$.ofType(REFRESH_LIST_AGENCY).switchMap(async action => {
    try {
      const resp = await agencyApi.listAgency(action.payload);
      return { type: REFRESH_LIST_AGENCY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_AGENCY_FAILURE, payload: error };
    }
  });

export const listAgencyEpic = combineEpics(
  getListAgencyEpic,
  refreshListAgencyEpic,
  loadMoreListAgencyEpic
);
