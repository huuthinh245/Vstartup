import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_MAP_REALTY,
  GET_MAP_REALTY_SUCCESS,
  GET_MAP_REALTY_FAILURE,
  LOAD_MORE_MAP_REALTY,
  LOAD_MORE_MAP_REALTY_SUCCESS,
  LOAD_MORE_MAP_REALTY_FAILURE,
  REFRESH_MAP_REALTY,
  REFRESH_MAP_REALTY_SUCCESS,
  REFRESH_MAP_REALTY_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getMapRealtyEpic = actions$ =>
  actions$.ofType(GET_MAP_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.mapRealty(action.payload);
      return {
        type: GET_MAP_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error, true);
      return { type: GET_MAP_REALTY_FAILURE, payload: error };
    }
  });

const refreshMapRealtyEpic = actions$ =>
  actions$.ofType(REFRESH_MAP_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.mapRealty(action.payload);
      return {
        type: REFRESH_MAP_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_MAP_REALTY_FAILURE, payload: error };
    }
  });

const loadMoreMapRealtyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_MAP_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.mapRealty(action.payload);
      return {
        type: LOAD_MORE_MAP_REALTY_SUCCESS,
        payload: resp.body
      };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_MAP_REALTY_FAILURE, payload: error };
    }
  });

export const mapRealtyEpic = combineEpics(
  getMapRealtyEpic,
  refreshMapRealtyEpic,
  loadMoreMapRealtyEpic
);
