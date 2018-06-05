import { handleActions } from 'redux-actions';
import {
  GET_AGENCY_PROJECT,
  GET_AGENCY_PROJECT_SUCCESS,
  GET_AGENCY_PROJECT_FAILURE,
  LOAD_MORE_AGENCY_PROJECT,
  LOAD_MORE_AGENCY_PROJECT_SUCCESS,
  LOAD_MORE_AGENCY_PROJECT_FAILURE
} from './actions';

const initial = {
  fetching: false,
  loadMore: false,
  data: {},
  error: null
};

export const agencyProjectReducer = handleActions(
  {
    [GET_AGENCY_PROJECT]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_AGENCY_PROJECT_SUCCESS]: (state, { payload }) => {
      state.data[payload.author] = payload.data;
      return Object.assign({}, state, { fetching: false, error: null });
    },
    [GET_AGENCY_PROJECT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [LOAD_MORE_AGENCY_PROJECT]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [LOAD_MORE_AGENCY_PROJECT_SUCCESS]: (state, { payload }) => {
      if (!state.data[payload.author]) {
        state.data[payload.author] = payload.data;
      } else {
        payload.data.forEach(item => {
          const index = state.data[payload.author].findIndex(i => i.id === item.id);
          if (index === -1) {
            state.data[payload.author].splice(0, 0, item);
          } else {
            Object.assign(state.data[payload.author][index], item);
          }
        });
      }
      return Object.assign({}, state, { loadMore: false, error: null });
    },
    [LOAD_MORE_AGENCY_PROJECT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    }
  },
  initial
);
