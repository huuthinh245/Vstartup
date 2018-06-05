import { handleActions } from 'redux-actions';

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

const initial = {
  sending: false,
  fetching: false,
  refreshing: false,
  loadMore: false,
  deleting: false,
  data: [],
  error: null
};

export const contactsReducer = handleActions(
  {
    [SEND_CONTACT]: state => {
      return Object.assign({}, state, { sending: true });
    },
    [GET_LIST_CONTACT]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [REFRESH_LIST_CONTACT]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [LOAD_MORE_LIST_CONTACT]: state => {
      return Object.assign({}, state, { loadMore: true });
    },
    [DELETE_CONTACT]: state => {
      return Object.assign({}, state, { deleting: true });
    },

    [SEND_CONTACT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { sending: false, error: payload });
    },
    [GET_LIST_CONTACT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, error: payload });
    },
    [REFRESH_LIST_CONTACT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, error: payload });
    },
    [LOAD_MORE_LIST_CONTACT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { loadMore: false, error: payload });
    },
    [DELETE_CONTACT_FAILURE]: (state, { payload }) => {
      return Object.assign({}, state, { deleting: false, error: payload });
    },

    [SEND_CONTACT_SUCCESS]: state => {
      return Object.assign({}, state, { sending: false, error: null });
    },
    [GET_LIST_CONTACT_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { fetching: false, data: payload, error: null });
    },
    [REFRESH_LIST_CONTACT_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, data: payload, error: null });
    },
    [LOAD_MORE_LIST_CONTACT_SUCCESS]: (state, { payload }) => {
      payload.forEach(item => {
        const index = state.data.findIndex(i => i.id === item.id);
        if (index === -1) {
          state.data.splice(0, 0, item);
        } else {
          Object.assign(state.data[index], item);
        }
      });
      return Object.assign({}, state, { loadMore: false, error: null });
    },
    [DELETE_CONTACT_SUCCESS]: (state, { payload }) => {
      const arr = state.data.filter(item => item.id !== payload);
      return Object.assign({}, state, { deleting: false, data: arr, error: null });
    }
  },
  initial
);
