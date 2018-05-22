import { store } from '../../app';

export const GET_LIST_REALTY = 'GET_LIST_REALTY';
export const GET_LIST_REALTY_SUCCESS = 'GET_LIST_REALTY_SUCCESS';
export const GET_LIST_REALTY_FAILURE = 'GET_LIST_REALTY_FAILURE';

export const REFRESH_LIST_REALTY = 'REFRESH_LIST_REALTY';
export const REFRESH_LIST_REALTY_SUCCESS = 'REFRESH_LIST_REALTY_SUCCESS';
export const REFRESH_LIST_REALTY_FAILURE = 'REFRESH_LIST_REALTY_FAILURE';

export const getListRealtyAction = payload =>
  store.dispatch({
    type: GET_LIST_REALTY,
    payload
  });

export const refreshListRealtyAction = payload =>
  store.dispatch({
    type: REFRESH_LIST_REALTY,
    payload
  });
