import { handleActions } from 'redux-actions';

import {
  GET_LIST_AGENCY,
  GET_LIST_AGENCY_SUCCESS,
  GET_LIST_AGENCY_FAILURE,
  REFRESH_LIST_AGENCY,
  REFRESH_LIST_AGENCY_SUCCESS,
  REFRESH_LIST_AGENCY_FAILURE,
  LOAD_MORE_LIST_AGENCY,
  LOAD_MORE_LIST_AGENCY_SUCCESS,
  LOAD_MORE_LIST_AGENCY_FAILURE
} from './actions';

const flag = {
  fetching: false,
  refreshing: false,
  loadMore: false
};

const initial = Object.assign(flag, { data: [] });

export const listAgencyReducer = handleActions(
  {
    [GET_LIST_AGENCY]: state => {
      return Object.assign({}, state, flag, { fetching: true });
    },
    [GET_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, flag, { data: payload });
    },
    [GET_LIST_AGENCY_FAILURE]: state => {
      return Object.assign({}, state, flag);
    },
    [LOAD_MORE_LIST_AGENCY]: state => {
      return Object.assign({}, state, flag, { loadMore: true });
    },
    [LOAD_MORE_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        } else {
          Object.assign(arr[index], item);
        }
      });
      return Object.assign({}, state, flag, { data: arr });
    },
    [LOAD_MORE_LIST_AGENCY_FAILURE]: state => {
      return Object.assign({}, state, flag);
    },
    [REFRESH_LIST_AGENCY]: state => {
      return Object.assign({}, state, flag, { refreshing: true });
    },
    [REFRESH_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, flag, { data: payload });
    },
    [REFRESH_LIST_AGENCY_FAILURE]: state => {
      return Object.assign({}, state, flag);
    }
  },
  initial
);
