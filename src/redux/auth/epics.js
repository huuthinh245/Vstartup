import 'rxjs';
import { combineEpics } from 'redux-observable';
import { AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import * as routes from '../../routes/routes';

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
  LOGOUT,
  LOGOUT_SUCCESS,
  AUTH_FAILURE,
  UPDATE_INFO,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE
} from './actions';
import { authApi, userApi, handleError } from '../../utils/api';
import { ApiClient } from '../../swaggerApi/src';
import { _alert } from '../../utils/alert';
import alertStrings from '../../localization/alert';
import { store } from '../../app';

const reset = () => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: routes.mainWithModal })]
  });
  const interval = setInterval(() => {
    const { city } = store.getState().city.data;
    const { utils } = store.getState().options.data;
    if (city && city[0] && utils[0]) {
      clearInterval(interval);
      store.dispatch(resetAction);
    }
  }, 200);
};

const loginEpic = actions$ =>
  actions$.ofType(LOGIN).switchMap(async action => {
    try {
      const resp = await authApi.login(action.payload);
      ApiClient.instance.authentications.Bearer.type = 'apiKey';
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = resp.body.token;
      AsyncStorage.setItem('token', resp.body.token);
      if (action.payload.callback) {
        action.payload.callback();
      }
      if (action.payload.reset === true) {
        reset();
      }
      return { type: LOGIN_SUCCESS, payload: resp.body };
    } catch (error) {
      AsyncStorage.setItem('token', '');
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const logoutEpic = actions$ =>
  actions$.ofType(LOGOUT).switchMap(async action => {
    try {
      await authApi.logout(action.payload);
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = '';
      ApiClient.instance.authentications.Bearer.apiKey = '';
      AsyncStorage.setItem('token', '');
      return { type: LOGOUT_SUCCESS };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const getMeEpic = actions$ =>
  actions$.ofType(GET_ME).switchMap(async action => {
    try {
      const resp = await userApi.me();
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = '';
      ApiClient.instance.authentications.Bearer.apiKey = '';
      AsyncStorage.setItem('token', '');
      return { type: GET_ME_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const forgotEpic = actions$ =>
  actions$.ofType(FORGOT).switchMap(async action => {
    try {
      const response = await userApi.forgot(action.payload.email);
      _alert(alertStrings.ok, response.body.message, [
        {
          text: alertStrings.ok,
          onPress: () => {
            const popAction = StackActions.pop({ n: 1 });
            store.dispatch(popAction);
          }
        }
      ]);
      return { type: FORGOT_SUCCESS };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const registerEpic = actions$ =>
  actions$.ofType(REGISTER).switchMap(async action => {
    try {
      const resp = await authApi.register(action.payload);
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = resp.body.token;
      AsyncStorage.setItem('token', resp.body.token);
      _alert(alertStrings.ok, alertStrings.registerSuccess, [
        {
          text: alertStrings.ok,
          onPress: () => {
            const popAction = StackActions.pop({ n: 1 });
            store.dispatch(popAction);
          }
        }
      ]);
      return { type: REGISTER_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const socialEpic = actions$ =>
  actions$.ofType(SOCIAL).switchMap(async action => {
    try {
      const resp = await authApi.registerSocial(action.payload);
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = resp.body.token;
      AsyncStorage.setItem('token', resp.body.token);
      return { type: SOCIAL_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE, payload: error };
    }
  });

const updateInfoEpic = actions$ =>
  actions$.ofType(UPDATE_INFO).switchMap(async action => {
    try {
      const resp = await userApi.updateUser(action.payload);
      action.payload.callback();
      return { type: UPDATE_INFO_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: UPDATE_INFO_FAILURE, payload: error };
    }
  });

export const authEpic = combineEpics(
  loginEpic,
  forgotEpic,
  registerEpic,
  socialEpic,
  getMeEpic,
  logoutEpic,
  updateInfoEpic
);
