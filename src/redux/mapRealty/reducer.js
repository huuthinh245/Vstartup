import { handleActions } from 'redux-actions';
import {
  GET_MAP_REALTY,
  GET_MAP_REALTY_SUCCESS,
  GET_MAP_REALTY_FAILURE,
  REFRESH_MAP_REALTY,
  REFRESH_MAP_REALTY_SUCCESS,
  REFRESH_MAP_REALTY_FAILURE
} from './actions';

import {
  LIKE_REALTY,
  LIKE_REALTY_FAILURE,
  LIKE_REALTY_SUCCESS,
  UNLIKE_REALTY,
  UNLIKE_REALTY_FAILURE,
  UNLIKE_REALTY_SUCCESS
} from '../realtyDetail/actions';

const initial = {
  fetching: false,
  loadMore: false,
  refreshing: false,
  postingFavorite: undefined,
  data: [],
  error: null
};

export const mapRealtyReducer = handleActions(
  {
    [REFRESH_MAP_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_MAP_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        refreshing: false,
        data: payload,
        error: null
      });
    },
    [REFRESH_MAP_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [GET_MAP_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_MAP_REALTY_SUCCESS]: (state, { payload }) => {
      payload.forEach(item => {
        const index = state.data.findIndex(i => i.id === item.id);
        if (index === -1) {
          state.data.push(item);
        } else {
          Object.assign(state.data[index], item);
        }
      });
      return Object.assign({}, state, { fetching: false, error: null });
    },
    [GET_MAP_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [LIKE_REALTY]: (state, { payload }) => {
      const index = state.data.findIndex(i => i.id === payload.id);
      if (index > -1) {
        Object.assign(state.data[index], { is_favorite: !payload.is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: payload.id });
    },
    [UNLIKE_REALTY]: (state, { payload }) => {
      const index = state.data.findIndex(i => i.id === payload.id);
      if (index > -1) {
        Object.assign(state.data[index], { is_favorite: !payload.is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: payload.id });
    },
    [LIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { realty } = payload;
      const index = state.data.findIndex(i => i.id === realty.id);
      if (index > -1) {
        Object.assign(state.data[index], { is_favorite: !payload.is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: undefined });
    },
    [UNLIKE_REALTY_FAILURE]: (state, { payload }) => {
      const { realty } = payload;
      const index = state.data.findIndex(i => i.id === realty.id);
      if (index > -1) {
        Object.assign(state.data[index], { is_favorite: !payload.is_favorite });
      }
      return Object.assign({}, state, { postingFavorite: undefined });
    },
    [LIKE_REALTY_SUCCESS]: state => {
      return Object.assign(state, { postingFavorite: undefined });
    },
    [UNLIKE_REALTY_SUCCESS]: state => {
      return Object.assign(state, { postingFavorite: undefined });
    }
  },
  initial
);
