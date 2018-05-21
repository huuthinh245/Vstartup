import 'rxjs';
import { makeFetchAction } from 'redux-api-call';
import { API_AUTH } from '../../utils/api';

export const REGISTER = 'REGISTER';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const GET_AUTH_TOKEN = 'GET_AUTH_TOKEN';
export const GET_SOCIAL_TOKEN = 'GET_SOCIAL_TOKEN';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const GET_AUTH_TOKEN_SUCCESS = 'GET_AUTH_TOKEN_SUCCESS';
export const GET_SOCIAL_TOKEN_SUCCESS = 'GET_SOCIAL_TOKEN_SUCCESS';

export const REGISTER_FAIL = 'REGISTER_FAIL';
export const FORGOT_PASSWORD_FAIL = 'FORGOT_PASSWORD_FAIL';
export const GET_AUTH_TOKEN_FAIL = 'GET_AUTH_TOKEN_FAIL';
export const GET_SOCIAL_TOKEN_FAIL = 'GET_SOCIAL_TOKEN_FAIL';

export const {
  actionCreator: registerAction,
  isFetchingSelector: isRegisteringSelector,
  dataSelector: dataRegisterSelector,
  errorSelector: errorRegisterSelector
} = makeFetchAction(REGISTER, obj => {
  return {
    endpoint: API_AUTH.register,
    headers: setDefaultHeader,
    method: 'GET',
    body: JSON.stringify(obj)
  };
});

export const {
  actionCreator: loginAction,
  isFetchingSelector: isLoggingInSelector,
  dataSelector: dataLoginSelector,
  errorSelector: errorLoginSelector
} = makeFetchAction(GET_AUTH_TOKEN, obj => {
  return {
    endpoint: API_AUTH.login,
    headers: setDefaultHeader,
    method: 'GET',
    body: JSON.stringify(obj)
  };
});
