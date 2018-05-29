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
  GET_ME,
  GET_ME_SUCCESS,
  AUTH_FAILURE
} from './actions';

const flag = {
  fetching: false
};

const initial = Object.assign(flag, {
  token: '',
  user: {},
  error: {}
});

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
    [GET_ME]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [AUTH_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, flag, { error: payload });
    },
    [FORGOT_SUCCESS]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [LOGIN_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, payload, { fetching: false });
    },
    [GET_ME_SUCCESS]: (state, { payload }) => {
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
