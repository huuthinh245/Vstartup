import { store } from '../../app';

export const LOGIN = 'LOGIN';
export const FORGOT = 'FORGOT';
export const REGISTER = 'REGISTER';
export const SOCIAL = 'SOCIAL';
export const GET_ME = 'GET_ME';
export const LOGOUT = 'LOGOUT';

export const GET_ME_SUCCESS = 'GET_ME_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SOCIAL_SUCCESS = 'SOCIAL_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const AUTH_FAILURE = 'AUTH_FAILURE';

export const loginAction = payload =>
  store.dispatch({
    type: LOGIN,
    payload
  });

export const logoutAction = payload =>
  store.dispatch({
    type: LOGOUT,
    payload
  });

export const forgotAction = payload =>
  store.dispatch({
    type: FORGOT,
    payload
  });

export const registerAction = payload =>
  store.dispatch({
    type: REGISTER,
    payload
  });

export const socialAction = payload =>
  store.dispatch({
    type: SOCIAL,
    payload
  });

export const getMeAction = payload =>
  store.dispatch({
    type: GET_ME,
    payload
  });
