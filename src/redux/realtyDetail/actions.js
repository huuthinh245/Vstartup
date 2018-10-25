import { store } from '../../app';

export const GET_REALTY_DETAIL = 'GET_REALTY_DETAIL';
export const GET_REALTY_DETAIL_SUCCESS = 'GET_REALTY_DETAIL_SUCCESS';
export const GET_REALTY_DETAIL_FAILURE = 'GET_REALTY_DETAIL_FAILURE';

export const LIKE_REALTY = 'LIKE_REALTY';
export const LIKE_REALTY_SUCCESS = 'LIKE_REALTY_SUCCESS';
export const LIKE_REALTY_FAILURE = 'LIKE_REALTY_FAILURE';

export const UNLIKE_REALTY = 'UNLIKE_REALTY';
export const UNLIKE_REALTY_SUCCESS = 'UNLIKE_REALTY_SUCCESS';
export const UNLIKE_REALTY_FAILURE = 'UNLIKE_REALTY_FAILURE';

export const POST_REALTY = 'POST_REALTY';
export const POST_REALTY_SUCCESS = 'POST_REALTY_SUCCESS';
export const POST_REALTY_FAILURE = 'POST_REALTY_FAILURE';

export const getRealtyDetailAction = (id, opts) =>
  store.dispatch({
    type: GET_REALTY_DETAIL,
    payload: { id, opts }
  });

export const likeRealtyAction = payload =>
  store.dispatch({
    type: LIKE_REALTY,
    payload
  });

export const unlikeRealtyAction = payload =>
  store.dispatch({
    type: UNLIKE_REALTY,
    payload
  });

export const postRealtyAction = payload =>
  store.dispatch({
    type: POST_REALTY,
    payload
  });
