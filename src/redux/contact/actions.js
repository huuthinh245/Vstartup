import { store } from '../../app';

export const SEND_CONTACT = 'SEND_CONTACT';
export const SEND_CONTACT_SUCCESS = 'SEND_CONTACT_SUCCESS';
export const SEND_CONTACT_FAILURE = 'SEND_CONTACT_FAILURE';

export const GET_LIST_CONTACT = 'GET_LIST_CONTACT';
export const GET_LIST_CONTACT_SUCCESS = 'GET_LIST_CONTACT_SUCCESS';
export const GET_LIST_CONTACT_FAILURE = 'GET_LIST_CONTACT_FAILURE';

export const REFRESH_LIST_CONTACT = 'REFRESH_LIST_CONTACT';
export const REFRESH_LIST_CONTACT_SUCCESS = 'REFRESH_LIST_CONTACT_SUCCESS';
export const REFRESH_LIST_CONTACT_FAILURE = 'REFRESH_LIST_CONTACT_FAILURE';

export const LOAD_MORE_LIST_CONTACT = 'LOAD_MORE_LIST_CONTACT';
export const LOAD_MORE_LIST_CONTACT_SUCCESS = 'LOAD_MORE_LIST_CONTACT_SUCCESS';
export const LOAD_MORE_LIST_CONTACT_FAILURE = 'LOAD_MORE_LIST_CONTACT_FAILURE';

export const DELETE_CONTACT = 'DELETE_CONTACT';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const DELETE_CONTACT_FAILURE = 'DELETE_CONTACT_FAILURE';

export const sendContactAction = payload =>
  store.dispatch({
    type: SEND_CONTACT,
    payload
  });

export const deleteContactAction = payload =>
  store.dispatch({
    type: DELETE_CONTACT,
    payload
  });

export const getListContactAction = payload =>
  store.dispatch({
    type: GET_LIST_CONTACT,
    payload
  });

export const refreshListContactAction = payload =>
  store.dispatch({
    type: REFRESH_LIST_CONTACT,
    payload
  });

export const loadMoreListContactAction = payload =>
  store.dispatch({
    type: LOAD_MORE_LIST_CONTACT,
    payload
  });
