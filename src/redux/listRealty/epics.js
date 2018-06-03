import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_REALTY,
  GET_LIST_REALTY_SUCCESS,
  GET_LIST_REALTY_FAILURE,
  REFRESH_LIST_REALTY,
  REFRESH_LIST_REALTY_SUCCESS,
  REFRESH_LIST_REALTY_FAILURE,
  LOAD_MORE_LIST_REALTY,
  LOAD_MORE_LIST_REALTY_SUCCESS,
  LOAD_MORE_LIST_REALTY_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getListRealtyEpic = actions$ =>
  actions$.ofType(GET_LIST_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return { type: GET_LIST_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_REALTY_FAILURE, payload: error };
    }
  });

const loadMoreListRealtyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return { type: LOAD_MORE_LIST_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_LIST_REALTY_FAILURE, payload: error };
    }
  });

const refreshListRealtyEpic = actions$ =>
  actions$.ofType(REFRESH_LIST_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return { type: REFRESH_LIST_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_REALTY_FAILURE, payload: error };
    }
  });

export const listRealtyEpic = combineEpics(
  getListRealtyEpic,
  refreshListRealtyEpic,
  loadMoreListRealtyEpic
);
