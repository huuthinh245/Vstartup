import { store } from '../../app';

export const GET_AGENCY_DETAIL = 'GET_AGENCY_DETAIL';
export const GET_AGENCY_DETAIL_SUCCESS = 'GET_AGENCY_DETAIL_SUCCESS';
export const GET_AGENCY_DETAIL_FAILURE = 'GET_AGENCY_DETAIL_FAILURE';

export const getAgencyDetailAction = payload =>
  store.dispatch({
    type: GET_AGENCY_DETAIL,
    payload
  });
