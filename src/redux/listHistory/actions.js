import { store } from '../../app';

export const GET_LIST_HISTORY = 'GET_LIST_HISTORY';
export const GET_LIST_HISTORY_SUCCESS = 'GET_LIST_HISTORY_SUCCESS';
export const GET_LIST_HISTORY_FAILURE = 'GET_LIST_HISTORY_FAILURE';

export const LOAD_MORE_LIST_HISTORY = 'LOAD_MORE_LIST_HISTORY';
export const LOAD_MORE_LIST_HISTORY_SUCCESS = 'LOAD_MORE_LIST_HISTORY_SUCCESS';
export const LOAD_MORE_LIST_HISTORY_FAILURE = 'LOAD_MORE_LIST_HISTORY_FAILURE';

export const REFRESH_LIST_HISTORY = 'REFRESH_LIST_HISTORY';
export const REFRESH_LIST_HISTORY_SUCCESS = 'REFRESH_LIST_HISTORY_SUCCESS';
export const REFRESH_LIST_HISTORY_FAILURE = 'REFRESH_LIST_HISTORY_FAILURE';

export const DELETE_HISTORY = 'DELETE_HISTORY';
export const DELETE_HISTORY_SUCCESS = 'DELETE_HISTORY_SUCCESS';
export const DELETE_HISTORY_FAILURE = 'DELETE_HISTORY_FAILURE';

export const getListHistoryAction = () =>
  store.dispatch({
    type: GET_LIST_HISTORY
  });

export const loadMoreListHistoryAction = () =>
  store.dispatch({
    type: LOAD_MORE_LIST_HISTORY
  });

export const refreshListHistoryAction = () =>
  store.dispatch({
    type: REFRESH_LIST_HISTORY
  });

export const deleteHistoryAction = payload =>
  store.dispatch({
    type: DELETE_HISTORY,
    payload
  });
