import 'rxjs';
import RNFetchBlob from 'react-native-fetch-blob';
import { combineEpics } from 'redux-observable';
import { StackActions, NavigationActions } from 'react-navigation';

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
import { _alert } from '../../utils/alert';
import alertStrings from '../../localization/alert';
import * as routes from '../../routes/routes';

const getRealtyDetail = actions$ =>
  actions$.ofType(GET_REALTY_DETAIL).switchMap(async action => {
    try {
      const resp = await realtyApi.viewRealty(
        action.payload.id,
        action.payload.opts
      );
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
      return {
        type: LIKE_REALTY_FAILURE,
        payload: { realty: action.payload, error }
      };
    }
  });

const unlikeRealty = actions$ =>
  actions$.ofType(UNLIKE_REALTY).switchMap(async action => {
    try {
      const resp = await realtyApi.deleteFavorite(action.payload.id);
      return {
        type: UNLIKE_REALTY_SUCCESS,
        payload: Object.assign({}, action.payload, {
          is_favorite: !action.payload.is_favorite
        })
      };
    } catch (error) {
      handleError(error, true);
      return {
        type: UNLIKE_REALTY_FAILURE,
        payload: { realty: action.payload, error }
      };
    }
  });

const postRealty = (actions$, store) =>
  actions$.ofType(POST_REALTY).switchMap(async action => {
    const resp = await RNFetchBlob.fetch(
      'POST',
      'https://rems.dfm-engineering.com/api/v1/realty',
      {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${action.payload.token}}`
      },
      action.payload.data
    );
    try {
      const { status } = resp.info();
      const value = resp.json();
      if (status === 200) {
        _alert(alertStrings.success, alertStrings.postRealtySuccess, [
          {
            text: alertStrings.viewRealtyDetail,
            onPress: () =>
              store.dispatch(
                NavigationActions.navigate({
                  routeName: routes.realtyDetail,
                  params: {
                    data: value,
                    onBack: () => store.dispatch(StackActions.popToTop())
                  }
                })
              )
          },
          {
            text: alertStrings.back,
            onPress: () => store.dispatch(NavigationActions.back({ key: null }))
          }
        ]);
        return { type: POST_REALTY_SUCCESS, payload: value };
      }
      _alert(`${alertStrings.error} ${value.code}`, value.message);
      return { type: POST_REALTY_FAILURE, payload: value };
    } catch (error) {
      _alert(`${alertStrings.error} ${value.code}`, value.message);
      return { type: POST_REALTY_FAILURE, payload: error };
    }
  });

export const realtyDetailEpic = combineEpics(
  getRealtyDetail,
  likeRealty,
  unlikeRealty,
  postRealty
);
