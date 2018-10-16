import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_HISTORY,
  GET_LIST_HISTORY_SUCCESS,
  GET_LIST_HISTORY_FAILURE,
  REFRESH_LIST_HISTORY,
  REFRESH_LIST_HISTORY_SUCCESS,
  REFRESH_LIST_HISTORY_FAILURE,
  DELETE_HISTORY,
  DELETE_HISTORY_SUCCESS,
  DELETE_HISTORY_FAILURE,
  LOAD_MORE_LIST_HISTORY,
  LOAD_MORE_LIST_HISTORY_SUCCESS,
  LOAD_MORE_LIST_HISTORY_FAILURE,
  ADD_HISTORY,
  ADD_HISTORY_FAILURE,
  ADD_HISTORY_SUCCESS
} from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getListHistoryEpic = actions$ =>
  actions$.ofType(GET_LIST_HISTORY).switchMap(async () => {
    try {
      const resp = await realtyApi.listKeyword();
      return { type: GET_LIST_HISTORY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_HISTORY_FAILURE, payload: error };
    }
  });

const refreshListHistoryEpic = actions$ =>
  actions$.ofType(REFRESH_LIST_HISTORY).switchMap(async () => {
    try {
      const resp = await realtyApi.listKeyword();
      return { type: REFRESH_LIST_HISTORY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_HISTORY_FAILURE, payload: error };
    }
  });

const loadMoreListHistoryEpic = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_HISTORY).switchMap(async () => {
    try {
      const resp = await realtyApi.listKeyword();
      return { type: LOAD_MORE_LIST_HISTORY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_LIST_HISTORY_FAILURE, payload: error };
    }
  });

const deleteHistoryEpic = actions$ =>
  actions$.ofType(DELETE_HISTORY).switchMap(async action => {
    try {
      const resp = await realtyApi.deleteKeyword(action.payload);
      action.payload.callback();
      return { type: DELETE_HISTORY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: DELETE_HISTORY_FAILURE, payload: error };
    }
  });

const addHistoryEpic = actions$ =>
  actions$.ofType(ADD_HISTORY).switchMap(async action => {
    try {
      const { lat, lng, address } = action.payload;
      const resp = await realtyApi.saveKeyword(lat, lng, address);
      return { type: ADD_HISTORY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: ADD_HISTORY_FAILURE, payload: error };
    }
  });

export const listHistoryEpic = combineEpics(
  getListHistoryEpic,
  refreshListHistoryEpic,
  deleteHistoryEpic,
  loadMoreListHistoryEpic,
  addHistoryEpic
);
