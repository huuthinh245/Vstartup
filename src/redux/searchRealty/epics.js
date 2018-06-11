import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_SEARCH_REALTY,
  GET_SEARCH_REALTY_SUCCESS,
  GET_SEARCH_REALTY_FAILURE,
  LOAD_MORE_SEARCH_REALTY,
  LOAD_MORE_SEARCH_REALTY_SUCCESS,
  LOAD_MORE_SEARCH_REALTY_FAILURE,
  REFRESH_SEARCH_REALTY,
  REFRESH_SEARCH_REALTY_SUCCESS,
  REFRESH_SEARCH_REALTY_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getSearchRealtyEpic = actions$ =>
  actions$.ofType(GET_SEARCH_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return {
        type: GET_SEARCH_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error, true);
      return { type: GET_SEARCH_REALTY_FAILURE, payload: error };
    }
  });

const refreshSearchRealtyEpic = actions$ =>
  actions$.ofType(REFRESH_SEARCH_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return {
        type: REFRESH_SEARCH_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_SEARCH_REALTY_FAILURE, payload: error };
    }
  });

const loadMoreSearchRealtyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_SEARCH_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return {
        type: LOAD_MORE_SEARCH_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_SEARCH_REALTY_FAILURE, payload: error };
    }
  });

export const searchRealtyEpic = combineEpics(
  getSearchRealtyEpic,
  refreshSearchRealtyEpic,
  loadMoreSearchRealtyEpic
);
