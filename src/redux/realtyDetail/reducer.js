import { handleActions } from 'redux-actions';

import {
  GET_REALTY_DETAIL,
  GET_REALTY_DETAIL_SUCCESS,
  GET_REALTY_DETAIL_FAILURE,
  LIKE_REALTY,
  LIKE_REALTY_SUCCESS,
  LIKE_REALTY_FAILURE,
  UNLIKE_REALTY,
  UNLIKE_REALTY_SUCCESS,
  UNLIKE_REALTY_FAILURE
} from './actions';

const flag = {
  fetching: false,
  postingFavorite: false
};

const initial = Object.assign(flag, { data: {} });

export const realtyDetailReducer = handleActions(
  {
    [GET_REALTY_DETAIL]: state => {
      return Object.assign({}, state, flag, { fetching: true });
    },
    [GET_REALTY_DETAIL_FAILURE]: state => {
      return Object.assign({}, state, flag);
    },
    [GET_REALTY_DETAIL_SUCCESS]: (state, { payload }) => {
      if (!state.data[payload.id]) {
        state.data[payload.id] = payload;
      } else {
        Object.assign(state.data, { [payload.id]: payload });
      }
      return Object.assign({}, state, flag);
    },
    [LIKE_REALTY]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data[id];
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, flag, { postingFavorite: true });
    },
    [LIKE_REALTY_SUCCESS]: state => {
      return Object.assign({}, state, flag);
    },
    [LIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data[id];
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, flag);
    },
    [UNLIKE_REALTY]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data[id];
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, flag, { postingFavorite: true });
    },
    [UNLIKE_REALTY_SUCCESS]: state => {
      return Object.assign({}, state, flag);
    },
    [UNLIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { id, is_favorite } = payload;
      const realty = state.data[id];
      if (realty) {
        Object.assign(realty, { is_favorite: !is_favorite });
      }
      return Object.assign({}, state, flag);
    }
  },
  initial
);
