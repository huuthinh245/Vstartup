import { store } from '../../app';

export const GET_PROJECT_DETAIL = 'GET_PROJECT_DETAIL';
export const GET_PROJECT_DETAIL_SUCCESS = 'GET_PROJECT_DETAIL_SUCCESS';
export const GET_PROJECT_DETAIL_FAILURE = 'GET_PROJECT_DETAIL_FAILURE';

export const getProjectDetailAction = payload =>
  store.dispatch({
    type: GET_PROJECT_DETAIL,
    payload
  });
