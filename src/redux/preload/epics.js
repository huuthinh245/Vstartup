import 'rxjs';
import { combineEpics } from 'redux-observable';

import {
  GET_LIST_CITY,
  GET_LIST_CITY_SUCCESS,
  GET_LIST_CITY_FAILURE,
  GET_LIST_OPTIONS,
  GET_LIST_OPTIONS_SUCCESS,
  GET_LIST_OPTIONS_FAILURE
} from './actions';
import { listApi, handleError } from '../../utils/api';

let alerting = false;

const listOptionsEpic = actions$ =>
  actions$.ofType(GET_LIST_OPTIONS).switchMap(async () => {
    try {
      const resp = await listApi.option();
      return { type: GET_LIST_OPTIONS_SUCCESS, payload: resp.body };
    } catch (error) {
      if (!alerting) {
        alerting = true;
        handleError(error, false);
      } else {
        handleError(error);
      }
      return { type: GET_LIST_OPTIONS_FAILURE, payload: error };
    }
  });

const listCityEpic = actions$ =>
  actions$.ofType(GET_LIST_CITY).switchMap(async () => {
    try {
      const resp = await listApi.city();
      return { type: GET_LIST_CITY_SUCCESS, payload: resp.body };
    } catch (error) {
      if (!alerting) {
        alerting = true;
        handleError(error, false);
      } else {
        handleError(error);
      }
      return { type: GET_LIST_CITY_FAILURE, payload: error };
    }
  });

export const listEpic = combineEpics(listOptionsEpic, listCityEpic);
