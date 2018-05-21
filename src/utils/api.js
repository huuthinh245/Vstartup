import * as API from '../swaggerApi/src';

const agencyApi = new API.AgencyApi();
const authApi = new API.AuthApi();
const contactApi = new API.ContactApi();
const listApi = new API.ListApi();
const projectApi = new API.ProjectApi();
const realtyApi = new API.RealtyApi();
const userApi = new API.UserApi();

export { agencyApi, authApi, contactApi, listApi, projectApi, realtyApi, userApi };
