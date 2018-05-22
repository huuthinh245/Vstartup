import { handleActions } from 'redux-actions';
import {
  LIKE_REALTY,
  LIKE_REALTY_FAILURE,
  LIKE_REALTY_SUCCESS,
  UNLIKE_REALTY,
  UNLIKE_REALTY_SUCCESS,
  UNLIKE_REALTY_FAILURE
} from '../realtyDetail/actions';

import {
  GET_LIST_REALTY,
  GET_LIST_REALTY_SUCCESS,
  GET_LIST_REALTY_FAILURE,
  REFRESH_LIST_REALTY,
  REFRESH_LIST_REALTY_SUCCESS,
  REFRESH_LIST_REALTY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  refreshing: false,
  postingFavorite: false,
  data: []
};

export const listRealtyReducer = handleActions(
  {
    [GET_LIST_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_REALTY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        }
      });
      return Object.assign({}, state, { fetching: false, refreshing: false, data: arr });
    },
    [GET_LIST_REALTY_FAILURE]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [REFRESH_LIST_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, fetching: false, data: payload });
    },
    [REFRESH_LIST_REALTY_FAILURE]: state => {
      return Object.assign({}, state, { refreshing: false });
    },
    [LIKE_REALTY]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data.forEach(item => item.id === id);
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: true });
    },
    [LIKE_REALTY_SUCCESS]: state => {
      return Object.assign({}, state, { postingFavorite: false });
    },
    [LIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data.forEach(item => item.id === id);
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: false });
    },
    [UNLIKE_REALTY]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data.forEach(item => item.id === id);
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: true });
    },
    [UNLIKE_REALTY_SUCCESS]: state => {
      return Object.assign({}, state, { postingFavorite: false });
    },
    [UNLIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data.forEach(item => item.id === id);
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: false });
    }
  },
  initial
);
