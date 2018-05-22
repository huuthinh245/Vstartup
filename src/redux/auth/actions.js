import { store } from '../../app';

export const LOGIN = 'LOGIN';
export const FORGOT = 'FORGOT';
export const REGISTER = 'REGISTER';
export const SOCIAL = 'SOCIAL';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const FORGOT_SUCCESS = 'FORGOT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const SOCIAL_SUCCESS = 'SOCIAL_SUCCESS';

export const AUTH_FAILURE = 'AUTH_FAILURE';

export const loginAction = payload =>
  store.dispatch({
    type: LOGIN,
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
