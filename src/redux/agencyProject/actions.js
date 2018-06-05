import { store } from '../../app';

export const GET_AGENCY_PROJECT = 'GET_AGENCY_PROJECT';
export const GET_AGENCY_PROJECT_SUCCESS = 'GET_AGENCY_PROJECT_SUCCESS';
export const GET_AGENCY_PROJECT_FAILURE = 'GET_AGENCY_PROJECT_FAILURE';

export const LOAD_MORE_AGENCY_PROJECT = 'LOAD_MORE_AGENCY_PROJECT';
export const LOAD_MORE_AGENCY_PROJECT_SUCCESS = 'LOAD_MORE_AGENCY_PROJECT_SUCCESS';
export const LOAD_MORE_AGENCY_PROJECT_FAILURE = 'LOAD_MORE_AGENCY_PROJECT_FAILURE';

export const getAgencyProjectAction = payload =>
  store.dispatch({
    type: GET_AGENCY_PROJECT,
    payload
  });

export const loadMoreAgencyProjectAction = payload =>
  store.dispatch({
    type: LOAD_MORE_AGENCY_PROJECT,
    payload
  });
