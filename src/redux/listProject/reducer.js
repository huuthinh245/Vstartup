import { handleActions } from 'redux-actions';
import _ from 'lodash';

import {
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SUCCESS,
  GET_LIST_PROJECT_FAILURE,
  REFRESH_LIST_PROJECT,
  REFRESH_LIST_PROJECT_SUCCESS,
  REFRESH_LIST_PROJECT_FAILURE,
  LOAD_MORE_LIST_PROJECT,
  LOAD_MORE_LIST_PROJECT_SUCCESS,
  LOAD_MORE_LIST_PROJECT_FAILURE
} from './actions';

const initial = {
  fetching: false,
  refreshing: false,
  loadMore: false,
  data: [],
  error: null
};

export const listProjectReducer = handleActions(
  {
    [GET_LIST_PROJECT]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_PROJECT_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, fetching: false, error: null });
    },
    [GET_LIST_PROJECT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_LIST_PROJECT]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_PROJECT_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, refreshing: false, error: null });
    },
    [REFRESH_LIST_PROJECT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_LIST_PROJECT]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_LIST_PROJECT_SUCCESS]: (state, { payload }) => {
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
    [LOAD_MORE_LIST_PROJECT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    }
  },
  initial
);
