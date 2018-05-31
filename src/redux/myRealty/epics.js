import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_MY_REALTY,
  GET_MY_REALTY_SUCCESS,
  GET_MY_REALTY_FAILURE,
  LOAD_MORE_MY_REALTY,
  LOAD_MORE_MY_REALTY_SUCCESS,
  LOAD_MORE_MY_REALTY_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getMyRealtyEpic = actions$ =>
  actions$.ofType(GET_MY_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return { type: GET_MY_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_MY_REALTY_FAILURE, payload: error };
    }
  });

const loadMoreMyRealtyEpic = actions$ =>
  actions$.ofType(LOAD_MORE_MY_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.listRealty(action.payload);
      return { type: LOAD_MORE_MY_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_MY_REALTY_FAILURE, payload: error };
    }
  });

export const myRealtyEpic = combineEpics(getMyRealtyEpic, loadMoreMyRealtyEpic);
