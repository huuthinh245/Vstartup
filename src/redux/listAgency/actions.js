import { store } from '../../app';

export const GET_LIST_AGENCY = 'GET_LIST_AGENCY';
export const GET_LIST_AGENCY_SUCCESS = 'GET_LIST_AGENCY_SUCCESS';
export const GET_LIST_AGENCY_FAILURE = 'GET_LIST_AGENCY_FAILURE';

export const LOAD_MORE_LIST_AGENCY = 'LOAD_MORE_LIST_AGENCY';
export const LOAD_MORE_LIST_AGENCY_SUCCESS = 'LOAD_MORE_LIST_AGENCY_SUCCESS';
export const LOAD_MORE_LIST_AGENCY_FAILURE = 'LOAD_MORE_LIST_AGENCY_FAILURE';

export const REFRESH_LIST_AGENCY = 'REFRESH_LIST_AGENCY';
export const REFRESH_LIST_AGENCY_SUCCESS = 'REFRESH_LIST_AGENCY_SUCCESS';
export const REFRESH_LIST_AGENCY_FAILURE = 'REFRESH_LIST_AGENCY_FAILURE';

export const getListAgencyAction = payload =>
  store.dispatch({
    type: GET_LIST_AGENCY,
    payload
  });

export const loadMoreListAgencyAction = payload =>
  store.dispatch({
    type: LOAD_MORE_LIST_AGENCY,
    payload
  });

export const refreshListAgencyAction = payload =>
  store.dispatch({
    type: REFRESH_LIST_AGENCY,
    payload
  });
