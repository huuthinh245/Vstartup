import { handleActions } from 'redux-actions';

import {
  LIKE_REALTY,
  LIKE_REALTY_FAILURE,
  UNLIKE_REALTY,
  UNLIKE_REALTY_FAILURE,
  LIKE_REALTY_SUCCESS
} from '../realtyDetail/actions';

import {
  GET_LIST_FAVORITE,
  GET_LIST_FAVORITE_SUCCESS,
  GET_LIST_FAVORITE_FAILURE,
  REFRESH_LIST_FAVORITE,
  REFRESH_LIST_FAVORITE_SUCCESS,
  REFRESH_LIST_FAVORITE_FAILURE,
  LOAD_MORE_LIST_FAVORITE,
  LOAD_MORE_LIST_FAVORITE_SUCCESS,
  LOAD_MORE_LIST_FAVORITE_FAILURE
} from './actions';
import { handleLikeOrUnlikeRealty, handleLikeOrUnlikeRealtyFailure } from '../../utils/api';

const initial = {
  fetching: false,
  refreshing: false,
  loadMore: false,
  data: [],
  error: null
};

export const listFavoriteReducer = handleActions(
  {
    [GET_LIST_FAVORITE]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_FAVORITE_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, fetching: false, error: null });
    },
    [GET_LIST_FAVORITE_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [LOAD_MORE_LIST_FAVORITE]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_LIST_FAVORITE_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        } else {
          Object.assign(arr[index], item);
        }
      });
      return Object.assign({}, state, { data: arr, loadMore: false, error: null });
    },
    [LOAD_MORE_LIST_FAVORITE_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    },
    [REFRESH_LIST_FAVORITE]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_FAVORITE_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, refreshing: false, error: null });
    },
    [REFRESH_LIST_FAVORITE_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LIKE_REALTY]: (state, { payload }) => handleLikeOrUnlikeRealty(state, payload),
    [LIKE_REALTY_FAILURE]: (state, { payload }) => handleLikeOrUnlikeRealtyFailure(state, payload),
    [UNLIKE_REALTY]: (state, { payload }) => handleLikeOrUnlikeRealty(state, payload),
    [UNLIKE_REALTY_FAILURE]: (state, { payload }) =>
      handleLikeOrUnlikeRealtyFailure(state, payload),
    [LIKE_REALTY_SUCCESS]: (state, { payload }) => {
      const index = state.data.findIndex(item => item.id === payload.id);
      if (index === -1) {
        state.data.splice(0, 0, payload);
      }
      return Object.assign({}, state);
    }
  },
  initial
);
