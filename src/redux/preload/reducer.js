import { handleActions } from 'redux-actions';
import { AsyncStorage } from 'react-native';

import {
  GET_LIST_CITY,
  SET_LIST_CITY,
  GET_LIST_CITY_SUCCESS,
  GET_LIST_CITY_FAILURE,
  GET_LIST_OPTIONS,
  SET_LIST_OPTIONS,
  GET_LIST_OPTIONS_SUCCESS,
  GET_LIST_OPTIONS_FAILURE
} from './actions';

const initialOptions = {
  fetching: false,
  data: {
    utils: {},
    projectTypes: {},
    realtyTypes: {},
    methods: {},
    directions: {},
    priceUnits: {}
  }
};

const initialCities = {
  fetching: false,
  data: {}
};

export const optionsReducer = handleActions(
  {
    [GET_LIST_OPTIONS]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_OPTIONS_FAILURE]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [GET_LIST_OPTIONS_SUCCESS]: (state, { payload }) => {
      Object.assign(state.data, { utils: payload.utility });
      Object.assign(state.data, { projectTypes: payload.project_type });
      Object.assign(state.data, { realtyTypes: payload.realty_type });
      Object.assign(state.data, { methods: payload.method });
      Object.assign(state.data, { directions: payload.direction });
      Object.assign(state.data, { priceUnits: payload.price_unit });
      const rs = Object.assign({}, state, { fetching: false });
      AsyncStorage.setItem('options', JSON.stringify(rs));
      return rs;
    },
    [SET_LIST_OPTIONS]: (state, { payload }) => {
      return Object.assign({}, state, payload);
    }
  },
  initialOptions
);

export const cityReducer = handleActions(
  {
    [GET_LIST_CITY]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_CITY_FAILURE]: state => {
      return Object.assign({}, state, { fetching: false });
    },
    [GET_LIST_CITY_SUCCESS]: (state, { payload }) => {
      const rs = Object.assign({}, state, { fetching: false, data: payload });
      AsyncStorage.setItem('city', JSON.stringify(rs));
      return rs;
    },
    [SET_LIST_CITY]: (state, { payload }) => {
      const rs = Object.assign({}, state, payload);
      AsyncStorage.setItem('city', JSON.stringify(rs));
      return rs;
    }
  },
  initialCities
);
