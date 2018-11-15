import RNRestart from 'react-native-restart';

import * as API from '../swaggerApi/src';
import { _alert } from './alert';
import alertStrings from '../localization/alert';

export const handleError = (error, callback) => {
  if (!error.response && callback !== false) {
    _alert(alertStrings.deviceOffline, '', [
      {
        text: alertStrings.restart,
        onPress: () => RNRestart.Restart()
      },
      {
        text: alertStrings.cancel
      }
    ]);
  } else if (callback === true) {
    _alert(
      `${alertStrings.error} ${error.response.status}`,
      error.response.body.message
    );
  } else if (callback) {
    callback();
  }
};

export const handleLikeOrUnlikeRealty = (state, payload) => {
  const { id, is_favorite } = payload;
  const index = state.data.findIndex(item => item.id === id);
  if (index !== -1) {
    Object.assign(state.data[index], { is_favorite: !is_favorite });
  }
  return Object.assign({}, state);
};

export const handleLikeOrUnlikeRealtyFailure = (state, payload) => {
  const { id, is_favorite } = payload.realty;
  const index = state.data.findIndex(item => item.id === id);
  if (index !== -1) {
    Object.assign(state.data[index], { is_favorite: !is_favorite });
  }
  return Object.assign({}, state);
};

const agencyApi = new API.AgencyApi();
const authApi = new API.AuthApi();
const contactApi = new API.ContactApi();
const listApi = new API.ListApi();
const projectApi = new API.ProjectApi();
const realtyApi = new API.RealtyApi();
const userApi = new API.UserApi();

export {
  agencyApi,
  authApi,
  contactApi,
  listApi,
  projectApi,
  realtyApi,
  userApi
};
