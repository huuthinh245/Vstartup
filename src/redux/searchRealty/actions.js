import { store } from '../../app';

export const GET_SEARCH_REALTY = 'GET_SEARCH_REALTY';
export const GET_SEARCH_REALTY_SUCCESS = 'GET_SEARCH_REALTY_SUCCESS';
export const GET_SEARCH_REALTY_FAILURE = 'GET_SEARCH_REALTY_FAILURE';

export const REFRESH_SEARCH_REALTY = 'REFRESH_SEARCH_REALTY';
export const REFRESH_SEARCH_REALTY_SUCCESS = 'REFRESH_SEARCH_REALTY_SUCCESS';
export const REFRESH_SEARCH_REALTY_FAILURE = 'REFRESH_SEARCH_REALTY_FAILURE';

export const LOAD_MORE_SEARCH_REALTY = 'LOAD_MORE_SEARCH_REALTY';
export const LOAD_MORE_SEARCH_REALTY_SUCCESS = 'LOAD_MORE_SEARCH_REALTY_SUCCESS';
export const LOAD_MORE_SEARCH_REALTY_FAILURE = 'LOAD_MORE_SEARCH_REALTY_FAILURE';

export const getSearchRealtyAction = payload =>
  store.dispatch({
    type: GET_SEARCH_REALTY,
    payload
  });

export const refreshSearchRealtyAction = payload => 
  store.dispatch({
    type: REFRESH_SEARCH_REALTY,
    payload
  });

export const loadMoreSearchRealtyAction = payload =>
  store.dispatch({
    type: LOAD_MORE_SEARCH_REALTY,
    payload
  });
