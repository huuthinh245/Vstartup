import 'rxjs';
import { combineEpics } from 'redux-observable';
import { contactApi, handleError } from '../../utils/api';

import {
  SEND_CONTACT,
  SEND_CONTACT_SUCCESS,
  SEND_CONTACT_FAILURE,
  GET_LIST_CONTACT,
  GET_LIST_CONTACT_SUCCESS,
  GET_LIST_CONTACT_FAILURE,
  REFRESH_LIST_CONTACT,
  REFRESH_LIST_CONTACT_SUCCESS,
  REFRESH_LIST_CONTACT_FAILURE,
  LOAD_MORE_LIST_CONTACT,
  LOAD_MORE_LIST_CONTACT_SUCCESS,
  LOAD_MORE_LIST_CONTACT_FAILURE,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE
} from './actions';

const sendContact = actions$ =>
  actions$.ofType(SEND_CONTACT).switchMap(async action => {
    try {
      const resp = await contactApi.postContact(action.payload);
      return { type: SEND_CONTACT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: SEND_CONTACT_FAILURE, payload: error };
    }
  });

const deleteContact = actions$ =>
  actions$.ofType(DELETE_CONTACT).switchMap(async action => {
    try {
      const resp = await contactApi.deleteContact(action.payload);
      return { type: DELETE_CONTACT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: DELETE_CONTACT_FAILURE, payload: error };
    }
  });

const getListContact = actions$ =>
  actions$.ofType(GET_LIST_CONTACT).switchMap(async action => {
    try {
      const resp = await contactApi.listContact(action.payload);
      return { type: GET_LIST_CONTACT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: GET_LIST_CONTACT_FAILURE, payload: error };
    }
  });

const refreshListContact = actions$ =>
  actions$.ofType(REFRESH_LIST_CONTACT).switchMap(async action => {
    try {
      const resp = await contactApi.listContact(action.payload);
      return { type: REFRESH_LIST_CONTACT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error, true);
      return { type: REFRESH_LIST_CONTACT_FAILURE, payload: error };
    }
  });

const loadMoreListContact = actions$ =>
  actions$.ofType(LOAD_MORE_LIST_CONTACT).listContact(async action => {
    try {
      const resp = await contactApi.postContact(action.payload);
      return { type: LOAD_MORE_LIST_CONTACT_SUCCESS, payload: resp.body };
    } catch (error) {
      handleError(error);
      return { type: LOAD_MORE_LIST_CONTACT_FAILURE, payload: error };
    }
  });

export const sendContactEpic = combineEpics(
  sendContact,
  getListContact,
  refreshListContact,
  loadMoreListContact,
  deleteContact
);
