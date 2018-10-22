import { handleActions } from 'redux-actions';
import {
  GET_SEARCH_REALTY,
  GET_SEARCH_REALTY_SUCCESS,
  GET_SEARCH_REALTY_FAILURE,
  LOAD_MORE_SEARCH_REALTY,
  LOAD_MORE_SEARCH_REALTY_SUCCESS,
  LOAD_MORE_SEARCH_REALTY_FAILURE,
  REFRESH_SEARCH_REALTY,
  REFRESH_SEARCH_REALTY_SUCCESS,
  REFRESH_SEARCH_REALTY_FAILURE
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

export const searchRealtyReducer = handleActions(
  {
    [GET_SEARCH_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_SEARCH_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        fetching: false,
        data: payload,
        error: null
      });
    },
    [GET_SEARCH_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_SEARCH_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_SEARCH_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        refreshing: false,
        data: payload,
        error: null
      });
    },
    [REFRESH_SEARCH_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_SEARCH_REALTY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_SEARCH_REALTY_SUCCESS]: (state, { payload }) => {
      payload.forEach(item => {
        const index = state.data.findIndex(i => i.id === item.id);
        if (index === -1) {
          state.data.push(item);
        } else {
          Object.assign(state.data[index], item);
        }
      });
      return Object.assign({}, state, { loadMore: false, error: null });
    },
    [LOAD_MORE_SEARCH_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
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
