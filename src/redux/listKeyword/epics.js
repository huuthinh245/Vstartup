import 'rxjs';
import { combineEpics } from 'redux-observable';

import { GET_LIST_KEYWORD, GET_LIST_KEYWORD_SUCCESS, GET_LIST_KEYWORD_FAILURE } from './actions';
import { realtyApi, handleError } from '../../utils/api';

const getListKeywordEpic = actions$ =>
  actions$.ofType(GET_LIST_KEYWORD).switchMap(async () => {
    try {
      const resp = await realtyApi.listKeyword();
      return { type: GET_LIST_KEYWORD_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_KEYWORD_FAILURE };
    }
  });

export const listKeywordEpic = combineEpics(getListKeywordEpic);
