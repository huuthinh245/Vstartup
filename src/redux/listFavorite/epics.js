import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_FAVORITE,
  GET_LIST_FAVORITE_SUCCESS,
  GET_LIST_FAVORITE_FAILURE,
  REFRESH_LIST_FAVORITE,
  REFRESH_LIST_FAVORITE_SUCCESS,
  REFRESH_LIST_FAVORITE_FAILURE,
  LOAD_MORE_LIST_FAVORITE,
  LOAD_MORE_LIST_FAVORITE_SUCCESS,
  LOAD_MORE_LIST_FAVORITE_FAILURE
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getListFavoriteEpic = actions$ =>
  actions$.ofType(GET_LIST_FAVORITE).switchMap(async action => {
    try {
      const resp = await realtyApi.listFavorite(action.payload);
      return { type: GET_LIST_FAVORITE_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_FAVORITE_FAILURE, payload: error };
    }
  });

const loadMoreListFavoriteEpic = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_FAVORITE).switchMap(async action => {
    try {
      const resp = await realtyApi.listFavorite(action.payload);
      return { type: LOAD_MORE_LIST_FAVORITE_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: LOAD_MORE_LIST_FAVORITE_FAILURE, payload: error };
    }
  });

const refreshListFavoriteEpic = actions$ =>
  actions$.ofType(REFRESH_LIST_FAVORITE).switchMap(async action => {
    try {
      const resp = await realtyApi.listFavorite(action.payload);
      return { type: REFRESH_LIST_FAVORITE_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_FAVORITE_FAILURE, payload: error };
    }
  });

export const listFavoriteEpic = combineEpics(
  getListFavoriteEpic,
  refreshListFavoriteEpic,
  loadMoreListFavoriteEpic
);
