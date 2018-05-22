import { handleActions } from 'redux-actions';

import {
  LOGIN,
  FORGOT,
  REGISTER,
  SOCIAL,
  LOGIN_SUCCESS,
  FORGOT_SUCCESS,
  REGISTER_SUCCESS,
  SOCIAL_SUCCESS,
  AUTH_FAILURE
} from './actions';

const initial = {
  fetching: false,
  token: '',
  user: {}
};

export const authReducer = handleActions(
  {
    [LOGIN]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [FORGOT]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [REGISTER]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [SOCIAL]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [AUTH_FAILURE]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [FORGOT_SUCCESS]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [LOGIN_SUCCESS]: (state, { payload }) => {
      Object.assign(state, payload);
      return Object.assign({}, state, { fetching: false });
    },
    [REGISTER_SUCCESS]: (state, { payload }) => {
      Object.assign(state, payload);
      return Object.assign({}, state, { fetching: false });
    },
    [SOCIAL_SUCCESS]: (state, { payload }) => {
      Object.assign(state, payload);
      return Object.assign({}, state, { fetching: false });
    }
  },
  initial
);
