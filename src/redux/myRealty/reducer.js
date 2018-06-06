import { handleActions } from 'redux-actions';
import {
  GET_MY_REALTY,
  GET_MY_REALTY_SUCCESS,
  GET_MY_REALTY_FAILURE,
  LOAD_MORE_MY_REALTY,
  LOAD_MORE_MY_REALTY_SUCCESS,
  LOAD_MORE_MY_REALTY_FAILURE,
  REFRESH_MY_REALTY,
  REFRESH_MY_REALTY_SUCCESS,
  REFRESH_MY_REALTY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  loadMore: false,
  refreshing: false,
  data: [],
  error: null
};

export const myRealtyReducer = handleActions(
  {
    [GET_MY_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_MY_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, fetching: false, error: null });
    },
    [GET_MY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_MY_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_MY_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { data: payload, refreshing: false, error: null });
    },
    [REFRESH_MY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_MY_REALTY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_MY_REALTY_SUCCESS]: (state, { payload }) => {
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
    [LOAD_MORE_MY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    }
  },
  initial
);
