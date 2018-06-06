import { store } from '../../app';

export const GET_MY_REALTY = 'GET_MY_REALTY';
export const GET_MY_REALTY_SUCCESS = 'GET_MY_REALTY_SUCCESS';
export const GET_MY_REALTY_FAILURE = 'GET_MY_REALTY_FAILURE';

export const REFRESH_MY_REALTY = 'REFRESH_MY_REALTY';
export const REFRESH_MY_REALTY_SUCCESS = 'REFRESH_MY_REALTY_SUCCESS';
export const REFRESH_MY_REALTY_FAILURE = 'REFRESH_MY_REALTY_FAILURE';

export const LOAD_MORE_MY_REALTY = 'LOAD_MORE_MY_REALTY';
export const LOAD_MORE_MY_REALTY_SUCCESS = 'LOAD_MORE_MY_REALTY_SUCCESS';
export const LOAD_MORE_MY_REALTY_FAILURE = 'LOAD_MORE_MY_REALTY_FAILURE';

export const getMyRealtyAction = payload =>
  store.dispatch({
    type: GET_MY_REALTY,
    payload
  });

export const refreshMyRealtyAction = payload =>
  store.dispatch({
    type: REFRESH_MY_REALTY,
    payload
  });

export const loadMoreMyRealtyAction = payload =>
  store.dispatch({
    type: LOAD_MORE_MY_REALTY,
    payload
  });
