import 'rxjs';
import { combineEpics } from 'redux-observable';
import { realtyApi, handleError } from '../../utils/api';

import {
  GET_REALTY_DETAIL,
  GET_REALTY_DETAIL_SUCCESS,
  GET_REALTY_DETAIL_FAILURE,
  LIKE_REALTY,
  LIKE_REALTY_SUCCESS,
  LIKE_REALTY_FAILURE,
  UNLIKE_REALTY,
  UNLIKE_REALTY_SUCCESS,
  UNLIKE_REALTY_FAILURE
} from './actions';

const getRealtyDetail = actions$ =>
  actions$.ofType(GET_REALTY_DETAIL).switchMap(async action => {
    try {
      const resp = await realtyApi.viewRealty(action.payload.id);
      return { type: GET_REALTY_DETAIL_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_REALTY_DETAIL_FAILURE };
    }
  });

const likeRealty = actions$ =>
  actions$.ofType(LIKE_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.postFavorite(action.payload.id);
      return { type: LIKE_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: LIKE_REALTY_FAILURE, payload: { realty: action.payload, error } };
    }
  });

const unlikeRealty = actions$ =>
  actions$.ofType(UNLIKE_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.postFavorite(action.payload.id);
      return { type: UNLIKE_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: UNLIKE_REALTY_FAILURE, payload: { realty: action.payload, error } };
    }
  });

export const realtyDetailEpic = combineEpics(getRealtyDetail, likeRealty, unlikeRealty);
