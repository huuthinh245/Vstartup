import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SUCCESS,
  GET_LIST_PROJECT_FAILURE,
  REFRESH_LIST_PROJECT,
  REFRESH_LIST_PROJECT_SUCCESS,
  REFRESH_LIST_PROJECT_FAILURE,
  LOAD_MORE_LIST_PROJECT,
  LOAD_MORE_LIST_PROJECT_SUCCESS,
  LOAD_MORE_LIST_PROJECT_FAILURE
} from './actions';
import { projectApi, handleError } from '../../utils/api';

const getListProjectEpic = actions$ =>
  actions$.ofType(GET_LIST_PROJECT).switchMap(async action => {
    try {
      const resp = await projectApi.listProject(action.payload);
      return { type: GET_LIST_PROJECT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_PROJECT_FAILURE, payload: error };
    }
  });

const refreshListProjectEpic = actions$ =>
  actions$.ofType(REFRESH_LIST_PROJECT).switchMap(async action => {
    try {
      const resp = await projectApi.listProject(action.payload);
      return { type: REFRESH_LIST_PROJECT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_PROJECT_FAILURE, payload: error };
    }
  });

const loadMoreListProjectEpic = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_PROJECT).switchMap(async action => {
    try {
      const resp = await projectApi.listProject(action.payload);
      return { type: LOAD_MORE_LIST_PROJECT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_LIST_PROJECT_FAILURE, payload: error };
    }
  });

export const listProjectEpic = combineEpics(
  getListProjectEpic,
  refreshListProjectEpic,
  loadMoreListProjectEpic
);
