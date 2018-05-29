import { store } from '../../app';

export const GET_LIST_FAVORITE = 'GET_LIST_FAVORITE';
export const GET_LIST_FAVORITE_SUCCESS = 'GET_LIST_FAVORITE_SUCCESS';
export const GET_LIST_FAVORITE_FAILURE = 'GET_LIST_FAVORITE_FAILURE';

export const LOAD_MORE_LIST_FAVORITE = 'LOAD_MORE_LIST_FAVORITE';
export const LOAD_MORE_LIST_FAVORITE_SUCCESS = 'LOAD_MORE_LIST_FAVORITE_SUCCESS';
export const LOAD_MORE_LIST_FAVORITE_FAILURE = 'LOAD_MORE_LIST_FAVORITE_FAILURE';

export const REFRESH_LIST_FAVORITE = 'REFRESH_LIST_FAVORITE';
export const REFRESH_LIST_FAVORITE_SUCCESS = 'REFRESH_LIST_FAVORITE_SUCCESS';
export const REFRESH_LIST_FAVORITE_FAILURE = 'REFRESH_LIST_FAVORITE_FAILURE';

export const getListFavoriteAction = payload =>
  store.dispatch({
    type: GET_LIST_FAVORITE,
    payload
  });

export const loadMoreListFavoriteAction = payload =>
  store.dispatch({
    type: LOAD_MORE_LIST_FAVORITE,
    payload
  });

export const refreshListFavoriteAction = payload =>
  store.dispatch({
    type: REFRESH_LIST_FAVORITE,
    payload
  });
