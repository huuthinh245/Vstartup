import { store } from '../../app';

export const GET_MAP_REALTY = 'GET_MAP_REALTY';
export const GET_MAP_REALTY_SUCCESS = 'GET_MAP_REALTY_SUCCESS';
export const GET_MAP_REALTY_FAILURE = 'GET_MAP_REALTY_FAILURE';

export const REFRESH_MAP_REALTY = 'REFRESH_MAP_REALTY';
export const REFRESH_MAP_REALTY_SUCCESS = 'REFRESH_MAP_REALTY_SUCCESS';
export const REFRESH_MAP_REALTY_FAILURE = 'REFRESH_MAP_REALTY_FAILURE';

export const LOAD_MORE_MAP_REALTY = 'LOAD_MORE_MAP_REALTY';
export const LOAD_MORE_MAP_REALTY_SUCCESS = 'LOAD_MORE_MAP_REALTY_SUCCESS';
export const LOAD_MORE_MAP_REALTY_FAILURE = 'LOAD_MORE_MAP_REALTY_FAILURE';

export const getMapRealtyAction = payload =>
  store.dispatch({
    type: GET_MAP_REALTY,
    payload
  });

export const refreshMapRealtyAction = payload => {
  store.dispatch({
    type: REFRESH_MAP_REALTY,
    payload
  });
}
export const loadMoreMapRealtyAction = payload =>
  store.dispatch({
    type: LOAD_MORE_MAP_REALTY,
    payload
  });
