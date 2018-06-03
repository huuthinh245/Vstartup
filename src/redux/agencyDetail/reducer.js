import { handleActions } from 'redux-actions';

import { GET_AGENCY_DETAIL, GET_AGENCY_DETAIL_SUCCESS, GET_AGENCY_DETAIL_FAILURE } from './actions';

const initial = {
  fetching: false,
  data: {},
  error: null
};

export const agencyDetailReducer = handleActions(
  {
    [GET_AGENCY_DETAIL]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_AGENCY_DETAIL_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [GET_AGENCY_DETAIL_SUCCESS]: (state, { payload }) => {
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
