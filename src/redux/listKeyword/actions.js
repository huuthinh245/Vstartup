import { store } from '../../app';

export const GET_LIST_KEYWORD = 'GET_LIST_KEYWORD';
export const GET_LIST_KEYWORD_SUCCESS = 'GET_LIST_KEYWORD_SUCCESS';
export const GET_LIST_KEYWORD_FAILURE = 'GET_LIST_KEYWORD_FAILURE';

export const getListKeywordAction = () =>
  store.dispatch({
    type: GET_LIST_KEYWORD
  });
