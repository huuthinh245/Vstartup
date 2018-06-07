import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_AGENCY_PROJECT,
  GET_AGENCY_PROJECT_SUCCESS,
  GET_AGENCY_PROJECT_FAILURE,
  LOAD_MORE_AGENCY_PROJECT,
  LOAD_MORE_AGENCY_PROJECT_SUCCESS,
  LOAD_MORE_AGENCY_PROJECT_FAILURE,
  REFRESH_AGENCY_PROJECT,
  REFRESH_AGENCY_PROJECT_SUCCESS,
  REFRESH_AGENCY_PROJECT_FAILURE
} from './actions';
import { projectApi, handleError } from '../../utils/api';

const getAgencyProjectEpic = actions$ =>
  actions$.ofType(GET_AGENCY_PROJECT).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.author_id === 0) delete opts.author_id;
      const resp = await projectApi.listProject(opts);
      return {
        type: GET_AGENCY_PROJECT_SUCCESS,
        payload: { author: action.payload.author_id, data: resp.body }
      };
    } catch (error) {
      handleError(error, true);
      return { type: GET_AGENCY_PROJECT_FAILURE, payload: error };
    }
  });

const refreshAgencyProjectEpic = actions$ =>
  actions$.ofType(REFRESH_AGENCY_PROJECT).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.author_id === 0) delete opts.author_id;
      const resp = await projectApi.listProject(opts);
      return {
        type: REFRESH_AGENCY_PROJECT_SUCCESS,
        payload: { author: action.payload.author_id, data: resp.body }
      };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_AGENCY_PROJECT_FAILURE, payload: error };
    }
  });

const loadMoreAgencyProjectEpic = actions$ =>
  actions$.ofType(LOAD_MORE_AGENCY_PROJECT).switchMap(async action => {
    try {
      const opts = Object.assign({}, action.payload);
      if (action.payload.author_id === 0) delete opts.author_id;
      const resp = await projectApi.listProject(opts);
      return {
        type: LOAD_MORE_AGENCY_PROJECT_SUCCESS,
        payload: { author: action.payload.author_id, data: resp.body }
      };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_AGENCY_PROJECT_FAILURE, payload: error };
    }
  });

export const agencyProjectEpic = combineEpics(
  getAgencyProjectEpic,
  refreshAgencyProjectEpic,
  loadMoreAgencyProjectEpic
);
