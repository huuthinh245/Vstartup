import { handleActions } from 'redux-actions';

import {
  GET_LIST_AGENCY,
  GET_LIST_AGENCY_SUCCESS,
  GET_LIST_AGENCY_FAILURE,
  SEARCH_LIST_AGENCY,
  SEARCH_LIST_AGENCY_SUCCESS,
  SEARCH_LIST_AGENCY_FAILURE,
  REFRESH_LIST_AGENCY,
  REFRESH_LIST_AGENCY_SUCCESS,
  REFRESH_LIST_AGENCY_FAILURE,
  LOAD_MORE_LIST_AGENCY,
  LOAD_MORE_LIST_AGENCY_SUCCESS,
  LOAD_MORE_LIST_AGENCY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  searching: false,
  refreshing: false,
  loadMore: false,
  data: [],
  error: null
};

export const listAgencyReducer = handleActions(
  {
    [GET_LIST_AGENCY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, fetching: false, error: null });
    },
    [GET_LIST_AGENCY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [SEARCH_LIST_AGENCY]: state => {
      return Object.assign({}, state, { searching: true });
    },
    [SEARCH_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, searching: false, error: null });
    },
    [SEARCH_LIST_AGENCY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { searching: false, error: payload });
    },
    [LOAD_MORE_LIST_AGENCY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.push(item);
        } else {
          Object.assign(arr[index], item);
        }
      });
      return Object.assign({}, state, { data: arr, loadMore: false, error: null });
    },
    [LOAD_MORE_LIST_AGENCY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    },
    [REFRESH_LIST_AGENCY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_AGENCY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, refreshing: false, error: null });
    },
    [REFRESH_LIST_AGENCY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    }
  },
  initial
);
