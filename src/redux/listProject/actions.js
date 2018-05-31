import { store } from '../../app';

export const GET_LIST_PROJECT = 'GET_LIST_PROJECT';
export const GET_LIST_PROJECT_SUCCESS = 'GET_LIST_PROJECT_SUCCESS';
export const GET_LIST_PROJECT_FAILURE = 'GET_LIST_PROJECT_FAILURE';

export const REFRESH_LIST_PROJECT = 'REFRESH_LIST_PROJECT';
export const REFRESH_LIST_PROJECT_SUCCESS = 'REFRESH_LIST_PROJECT_SUCCESS';
export const REFRESH_LIST_PROJECT_FAILURE = 'REFRESH_LIST_PROJECT_FAILURE';

export const LOAD_MORE_LIST_PROJECT = 'LOAD_MORE_LIST_PROJECT';
export const LOAD_MORE_LIST_PROJECT_SUCCESS = 'LOAD_MORE_LIST_PROJECT_SUCCESS';
export const LOAD_MORE_LIST_PROJECT_FAILURE = 'LOAD_MORE_LIST_PROJECT_FAILURE';

export const getListProjectAction = () =>
  store.dispatch({
    type: GET_LIST_PROJECT
  });

export const refreshListProjectAction = () =>
  store.dispatch({
    type: REFRESH_LIST_PROJECT
  });

export const loadMoreListProjectAction = payload =>
  store.dispatch({
    type: LOAD_MORE_LIST_PROJECT,
    payload
  });
