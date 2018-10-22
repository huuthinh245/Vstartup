import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_AGENCY_REALTY,
  GET_AGENCY_REALTY_SUCCESS,
  GET_AGENCY_REALTY_FAILURE,
  LOAD_MORE_AGENCY_REALTY,
  LOAD_MORE_AGENCY_REALTY_SUCCESS,
  LOAD_MORE_AGENCY_REALTY_FAILURE,
  REFRESH_AGENCY_REALTY,
  REFRESH_AGENCY_REALTY_SUCCESS,
  REFRESH_AGENCY_REALTY_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getAgencyRealtyEpic = actions$ =>
  actions$.ofType(GET_AGENCY_REALTY).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.authorId === 0) delete opts.authorId;
      const resp = await realtyApi.listRealty(opts);
      return {
        type: GET_AGENCY_REALTY_SUCCESS,
        payload: { author: action.payload.authorId, data: resp.body }
      };
    } catch (error) {
      handleError(error, true);
      return { type: GET_AGENCY_REALTY_FAILURE, payload: error };
    }
  });

const refreshAgencyRealtyEpic = actions$ =>
  actions$.ofType(REFRESH_AGENCY_REALTY).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.authorId === 0) delete opts.authorId;
      const resp = await realtyApi.listRealty(opts);
      return {
        type: REFRESH_AGENCY_REALTY_SUCCESS,
        payload: { author: action.payload.authorId, data: resp.body }
      };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_AGENCY_REALTY_FAILURE, payload: error };
    }
  });

const loadMoreAgencyRealtyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_AGENCY_REALTY).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.authorId === 0) delete opts.authorId;
      const resp = await realtyApi.listRealty(opts);
      return {
        type: LOAD_MORE_AGENCY_REALTY_SUCCESS,
        payload: { author: action.payload.authorId, data: resp.body }
      };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_AGENCY_REALTY_FAILURE, payload: error };
    }
  });

export const agencyRealtyEpic = combineEpics(
  getAgencyRealtyEpic,
  refreshAgencyRealtyEpic,
  loadMoreAgencyRealtyEpic
);
