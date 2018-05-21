import { handleActions } from 'redux-actions';

export const GET_LIST_REALTY = 'GET_LIST_REALTY';
export const GET_LIST_REALTY_SUCCESS = 'GET_LIST_REALTY_SUCCESS';
export const REFRESH_LIST_REALTY = 'REFRESH_LIST_REALTY';
export const REFRESH_LIST_REALTY_SUCCESS = 'REFRESH_LIST_REALTY_SUCCESS';

const initial = {
  loading: false,
  refreshing: false,
  data: []
};

export const listRealtyReducer = handleActions(
  {
    [GET_LIST_REALTY]: state => {
      return Object.assign({}, state, { loading: true });
    },
    [GET_LIST_REALTY_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        }
      });
      return Object.assign({}, state, { loading: false, refreshing: false, data: arr });
    },
    [REFRESH_LIST_REALTY]: state => {
      return Object.assign({}, state, { refreshing: true });
    },
    [REFRESH_LIST_REALTY_SUCCESS]: (state, { payload }) => {
      return Object.assign({}, state, { refreshing: false, loading: false, data: payload });
    }
  },
  initial
);
