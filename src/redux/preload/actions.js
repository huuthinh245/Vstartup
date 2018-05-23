import { store } from '../../app';

export const GET_LIST_OPTIONS = 'GET_LIST_OPTIONS';
export const SET_LIST_OPTIONS = 'SET_LIST_OPTIONS';
export const GET_LIST_OPTIONS_SUCCESS = 'GET_LIST_OPTIONS_SUCCESS';
export const GET_LIST_OPTIONS_FAILURE = 'GET_LIST_OPTIONS_FAILURE';

export const GET_LIST_CITY = 'GET_LIST_CITY';
export const SET_LIST_CITY = 'SET_LIST_CITY';
export const GET_LIST_CITY_SUCCESS = 'GET_LIST_CITY_SUCCESS';
export const GET_LIST_CITY_FAILURE = 'GET_LIST_CITY_FAILURE';

export const getListOptionsAction = payload =>
  store.dispatch({
    type: GET_LIST_OPTIONS,
    payload
  });

export const getListCityAction = payload =>
  store.dispatch({
    type: GET_LIST_CITY,
    payload
  });

export const setListOptionsAction = payload =>
  store.dispatch({
    type: SET_LIST_OPTIONS,
    payload
  });

export const setListCityAction = payload =>
  store.dispatch({
    type: SET_LIST_CITY,
    payload
  });
