import { handleActions } from 'redux-actions';

import {
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_DETAIL_FAILURE
} from './actions';

const initial = {
  fetching: false,
  data: {},
  error: null
};

export const projectDetailReducer = handleActions(
  {
    [GET_PROJECT_DETAIL]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_PROJECT_DETAIL_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [GET_PROJECT_DETAIL_SUCCESS]: (state, { payload }) => {
      if (!state.data[payload.id]) {
        state.data[payload.id] = payload;
      } else {
        Object.assign(state.data, { [payload.id]: payload });
      }
      return Object.assign({}, state, { fetching: false, error: null });
    }
  },
  initial
);
