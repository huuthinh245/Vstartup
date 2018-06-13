import 'rxjs';
import RNFetchBlob from 'react-native-fetch-blob';
import { combineEpics } from 'redux-observable';
import { realtyApi, handleError } from '../../utils/api';

import {
  GET_REALTY_DETAIL,
  GET_REALTY_DETAIL_SUCCESS,
  GET_REALTY_DETAIL_FAILURE,
  LIKE_REALTY,
  LIKE_REALTY_SUCCESS,
  LIKE_REALTY_FAILURE,
  UNLIKE_REALTY,
  UNLIKE_REALTY_SUCCESS,
  UNLIKE_REALTY_FAILURE,
  POST_REALTY,
  POST_REALTY_SUCCESS,
  POST_REALTY_FAILURE
} from './actions';

const getRealtyDetail = actions$ =>
  actions$.ofType(GET_REALTY_DETAIL).switchMap(async action => {
    try {
      const resp = await realtyApi.viewRealty(action.payload.id);
      return { type: GET_REALTY_DETAIL_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_REALTY_DETAIL_FAILURE };
    }
  });

const likeRealty = actions$ =>
  actions$.ofType(LIKE_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.postFavorite(action.payload.id);
      return { type: LIKE_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: LIKE_REALTY_FAILURE, payload: { realty: action.payload, error } };
    }
  });

const unlikeRealty = actions$ =>
  actions$.ofType(UNLIKE_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.postFavorite(action.payload.id);
      return { type: UNLIKE_REALTY_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: UNLIKE_REALTY_FAILURE, payload: { realty: action.payload, error } };
    }
  });

const postRealty = actions$ =>
  actions$.ofType(POST_REALTY).switchMap(async action => {
    try {
      const resp = await RNFetchBlob.fetch(
        'POST',
        'https://rems.dfm-engineering.com/api/v1/realty',
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${action.payload.token}}`,
          otherHeader: 'foo'
        },
        action.payload.data
      );
      console.log(resp.json());
      return { type: POST_REALTY_SUCCESS, payload: resp.json() };
    } catch (error) {
      console.log(error);
      handleError(error, true);
      return { type: POST_REALTY_FAILURE, payload: { realty: action.payload, error } };
    }
  });

export const realtyDetailEpic = combineEpics(getRealtyDetail, likeRealty, unlikeRealty, postRealty);
