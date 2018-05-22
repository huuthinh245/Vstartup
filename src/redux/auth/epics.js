import 'rxjs';
import { combineEpics } from 'redux-observable';
import { AsyncStorage } from 'react-native';
import { StackActions } from 'react-navigation';

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
import { authApi, userApi, handleError } from '../../utils/api';
import { ApiClient } from '../../swaggerApi/src';
import { _alert } from '../../utils/alert';
import alertStrings from '../../localization/alert';
import { store } from '../../app';

const loginEpic = actions$ =>
  actions$.ofType(LOGIN).switchMap(async action => {
    try {
      const resp = await authApi.login(action.payload);
      ApiClient.instance.authentications.Bearer.apiKeyPrefix = 'Bearer';
      ApiClient.instance.authentications.Bearer.apiKey = resp.body.token;
      AsyncStorage.setItem('token', resp.body.token);
      return { type: LOGIN_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: AUTH_FAILURE };
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
      return { type: AUTH_FAILURE };
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
      return { type: AUTH_FAILURE };
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
      return { type: AUTH_FAILURE };
    }
  });

export const authEpic = combineEpics(loginEpic, forgotEpic, registerEpic, socialEpic);
