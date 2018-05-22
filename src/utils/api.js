import * as API from '../swaggerApi/src';
import { _alert } from './alert';
import alertStrings from '../localization/alert';

export const handleError = (error, callback) => {
  if (!error.response) {
    _alert(alertStrings.error, error.message);
  } else if (callback === true) {
    _alert(`${alertStrings.error} ${error.response.status}`, error.response.body.message);
  } else if (callback) {
    callback();
  }
};

const agencyApi = new API.AgencyApi();
const authApi = new API.AuthApi();
const contactApi = new API.ContactApi();
const listApi = new API.ListApi();
const projectApi = new API.ProjectApi();
const realtyApi = new API.RealtyApi();
const userApi = new API.UserApi();

export { agencyApi, authApi, contactApi, listApi, projectApi, realtyApi, userApi };
