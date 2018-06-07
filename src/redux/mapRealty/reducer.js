import { handleActions } from 'redux-actions';
import {
  GET_MAP_REALTY,
  GET_MAP_REALTY_SUCCESS,
  GET_MAP_REALTY_FAILURE,
  LOAD_MORE_MAP_REALTY,
  LOAD_MORE_MAP_REALTY_SUCCESS,
  LOAD_MORE_MAP_REALTY_FAILURE,
  REFRESH_MAP_REALTY,
  REFRESH_MAP_REALTY_SUCCESS,
  REFRESH_MAP_REALTY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  loadMore: false,
  refreshing: false,
  data: [],
  error: null
};

export const mapRealtyReducer = handleActions(
  {
    [GET_MAP_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_MAP_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, data: payload, error: null });
    },
    [GET_MAP_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_MAP_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_MAP_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, data: payload, error: null });
    },
    [REFRESH_MAP_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_MAP_REALTY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_MAP_REALTY_SUCCESS]: (state, { payload }) => {
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
    [LOAD_MORE_MAP_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    }
  },
  initial
);
