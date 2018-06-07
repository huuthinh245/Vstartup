import { handleActions } from 'redux-actions';
import {
  GET_AGENCY_REALTY,
  GET_AGENCY_REALTY_SUCCESS,
  GET_AGENCY_REALTY_FAILURE,
  LOAD_MORE_AGENCY_REALTY,
  LOAD_MORE_AGENCY_REALTY_SUCCESS,
  LOAD_MORE_AGENCY_REALTY_FAILURE,
  REFRESH_AGENCY_REALTY,
  REFRESH_AGENCY_REALTY_SUCCESS,
  REFRESH_AGENCY_REALTY_FAILURE
} from './actions';

const initial = {
  fetching: false,
  loadMore: false,
  refreshing: false,
  data: {},
  error: null
};

export const agencyRealtyReducer = handleActions(
  {
    [GET_AGENCY_REALTY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_AGENCY_REALTY_SUCCESS]: (state, { payload }) => {
      state.data[payload.author] = payload.data;
      return Object.assign({}, state, { fetching: false, error: null });
    },
    [GET_AGENCY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_AGENCY_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_AGENCY_REALTY_SUCCESS]: (state, { payload }) => {
      state.data[payload.author] = payload.data;
      return Object.assign({}, state, { refreshing: false, error: null });
    },
    [REFRESH_AGENCY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_AGENCY_REALTY]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_AGENCY_REALTY_SUCCESS]: (state, { payload }) => {
      if (!state.data[payload.author]) {
        state.data[payload.author] = payload.data;
      } else {
        payload.data.forEach(item => {
          const index = state.data[payload.author].findIndex(i => i.id === item.id);
          if (index === -1) {
            state.data[payload.author].push(item);
          } else {
            Object.assign(state.data[payload.author][index], item);
          }
        });
      }
      return Object.assign({}, state, { loadMore: false, error: null });
    },
    [LOAD_MORE_AGENCY_REALTY_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    }
  },
  initial
);
