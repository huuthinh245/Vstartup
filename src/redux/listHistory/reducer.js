import { handleActions } from 'redux-actions';
import _ from 'lodash';

import {
  GET_LIST_HISTORY,
  GET_LIST_HISTORY_SUCCESS,
  GET_LIST_HISTORY_FAILURE,
  REFRESH_LIST_HISTORY,
  REFRESH_LIST_HISTORY_SUCCESS,
  REFRESH_LIST_HISTORY_FAILURE,
  DELETE_HISTORY,
  DELETE_HISTORY_SUCCESS,
  DELETE_HISTORY_FAILURE,
  LOAD_MORE_LIST_HISTORY,
  LOAD_MORE_LIST_HISTORY_SUCCESS,
  LOAD_MORE_LIST_HISTORY_FAILURE,
  ADD_HISTORY,
  ADD_HISTORY_SUCCESS,
  ADD_HISTORY_FAILURE
} from './actions';
import { LOGOUT_SUCCESS } from '../auth/actions';

const initial = {
  fetching: false,
  loadMore: false,
  refreshing: false,
  deleting: false,
  adding: false,
  data: [],
  error: null
};

export const listHistoryReducer = handleActions(
  {
    [GET_LIST_HISTORY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_HISTORY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        data: payload,
        fetching: false,
        error: null
      });
    },
    [GET_LIST_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [LOAD_MORE_LIST_HISTORY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_LIST_HISTORY_SUCCESS]: (state, { payload }) => {
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
    [LOAD_MORE_LIST_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    },
    [REFRESH_LIST_HISTORY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_HISTORY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, {
        data: payload,
        refreshing: false,
        error: null
      });
    },
    [REFRESH_LIST_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [DELETE_HISTORY]: state => {
      return Object.assign({}, state, { deleting: true });
    },
    [DELETE_HISTORY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.ids.forEach(item => {
        _.remove(arr, value => value.id === item);
      });
      return {
        ...state,
        deleting: false,
        error: null,
        data: arr
      };
    },
    [DELETE_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { deleting: false, error: payload });
    },
    [ADD_HISTORY]: state => {
      return Object.assign({}, state, { adding: true });
    },
    [ADD_HISTORY_SUCCESS]: (state, { payload }) => {
      state.data.unshift(payload);
      return Object.assign({}, state, { adding: false });
    },
    [ADD_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { adding: false, error: payload });
    },
    [LOGOUT_SUCCESS]: (state) => {
      return Object.assign({}, state, initial);
    }
  },
  initial
);
