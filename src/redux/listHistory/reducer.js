import { handleActions } from 'redux-actions';

import {
  GET_LIST_HISTORY,
  GET_LIST_HISTORY_SUCCESS,
  GET_LIST_HISTORY_FAILURE,
  REFRESH_LIST_HISTORY,
  REFRESH_LIST_HISTORY_SUCCESS,
  REFRESH_LIST_HISTORY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  refreshing: false,
  deleting: false,
  data: [],
  error: null
};

export const listHistoryReducer = handleActions(
  {
    [GET_LIST_HISTORY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_HISTORY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        } else {
          Object.assign(arr[index], item);
        }
      });
      return Object.assign({}, state, { data: arr, fetching: false, error: null });
    },
    [GET_LIST_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_LIST_HISTORY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_HISTORY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, refreshing: false, error: null });
    },
    [REFRESH_LIST_HISTORY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    }
  },
  initial
);
