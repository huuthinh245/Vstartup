import 'rxjs';
import { combineEpics } from 'redux-observable';
import { projectApi, handleError } from '../../utils/api';

import {
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_DETAIL_FAILURE
} from './actions';

const getProjectDetail = actions$ =>
  actions$.ofType(GET_PROJECT_DETAIL).switchMap(async action => {
    try {
      const resp = await projectApi.viewProject(action.payload.id);
      return { type: GET_PROJECT_DETAIL_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_PROJECT_DETAIL_FAILURE, payload: error };
    }
  });

export const projectDetailEpic = combineEpics(getProjectDetail);
