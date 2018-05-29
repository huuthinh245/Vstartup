import { handleActions } from 'redux-actions';

import { GET_AGENCY_DETAIL, GET_AGENCY_DETAIL_SUCCESS, GET_AGENCY_DETAIL_FAILURE } from './actions';

const flag = {
  fetching: false
};

const initial = Object.assign(flag, { data: {} });

export const agencyDetailReducer = handleActions(
  {
    [GET_AGENCY_DETAIL]: state => {
      return Object.assign({}, state, flag, { fetching: true });
    },
    [GET_AGENCY_DETAIL_FAILURE]: state => {
      return Object.assign({}, state, flag);
    },
    [GET_AGENCY_DETAIL_SUCCESS]: (state, { payload }) => {
      if (!state.data[payload.id]) {
        state.data[payload.id] = payload;
      } else {
        Object.assign(state.data, { [payload.id]: payload });
      }
      return Object.assign({}, state, flag);
    }
  },
  initial
);
