import { store } from '../../app';

export const GET_AGENCY_REALTY = 'GET_AGENCY_REALTY';
export const GET_AGENCY_REALTY_SUCCESS = 'GET_AGENCY_REALTY_SUCCESS';
export const GET_AGENCY_REALTY_FAILURE = 'GET_AGENCY_REALTY_FAILURE';

export const LOAD_MORE_AGENCY_REALTY = 'LOAD_MORE_AGENCY_REALTY';
export const LOAD_MORE_AGENCY_REALTY_SUCCESS = 'LOAD_MORE_AGENCY_REALTY_SUCCESS';
export const LOAD_MORE_AGENCY_REALTY_FAILURE = 'LOAD_MORE_AGENCY_REALTY_FAILURE';

export const getAgencyRealtyAction = payload =>
  store.dispatch({
    type: GET_AGENCY_REALTY,
    payload
  });

export const loadMoreAgencyRealtyAction = payload =>
  store.dispatch({
    type: LOAD_MORE_AGENCY_REALTY,
    payload
  });
