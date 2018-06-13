import { handleActions } from 'redux-actions';

import {
  SET_TOKEN,
  LOGIN,
  LOGOUT,
  FORGOT,
  REGISTER,
  SOCIAL,
  LOGIN_SUCCESS,
  FORGOT_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  SOCIAL_SUCCESS,
  GET_ME,
  GET_ME_SUCCESS,
  AUTH_FAILURE,
  UPDATE_INFO,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_AVATAR,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILURE
} from './actions';

const initial = {
  fetching: false,
  updating: false,
  token: '',
  user: {},
  error: {}
};

export const authReducer = handleActions(
  {
    [SET_TOKEN]: (state, { payload }) => {
      return Object.assign({}, state, { token: payload });
    },
    [LOGIN]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [LOGOUT]: state => {
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
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [FORGOT_SUCCESS]: state => {
      return Object.assign({}, state, { fetching: false, error: null });
    },
    [LOGIN_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, payload, { fetching: false, error: null });
    },
    [LOGOUT_SUCCESS]: state => {
      return Object.assign({}, state, { fetching: false, error: null, token: '', user: '' });
    },
    [GET_ME_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, user: payload, error: null });
    },
    [REGISTER_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, payload, { fetching: false, error: null });
    },
    [SOCIAL_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, payload, { fetching: false, error: null });
    },
    [UPDATE_INFO]: state => {
      return Object.assign({}, state, { updating: true });
    },
    [UPDATE_INFO_SUCCESS]: (state, { payload }) => {
      Object.assign(state.user, payload);
      return Object.assign({}, state, { updating: false, error: null });
    },
    [UPDATE_INFO_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, payload, { updating: false, error: payload });
    },
    [UPDATE_PASSWORD]: state => {
      return Object.assign({}, state, { updating: true });
    },
    [UPDATE_PASSWORD_SUCCESS]: state => {
      return Object.assign({}, state, { updating: false, error: null });
    },
    [UPDATE_PASSWORD_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, payload, { updating: false, error: payload });
    },
    [UPDATE_AVATAR]: state => {
      return Object.assign({}, state, { updating: true });
    },
    [UPDATE_AVATAR_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { updating: false, user: payload, error: null });
    },
    [UPDATE_AVATAR_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, payload, { updating: false, error: payload });
    }
  },
  initial
);
