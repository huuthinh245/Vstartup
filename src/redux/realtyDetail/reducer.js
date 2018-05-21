import { handleActions } from 'redux-actions';

export const GET_REALTY_DETAIL = 'GET_REALTY_DETAIL';
export const GET_REALTY_DETAIL_SUCCESS = 'GET_REALTY_DETAIL_SUCCESS';

const initial = {
  loading: false,
  data: {}
};

export const realtyDetailReducer = handleActions(
  {
    [GET_REALTY_DETAIL]: state => {
      return Object.assign({}, state, { loading: true });
    },
    [GET_REALTY_DETAIL_SUCCESS]: (state, { payload }) => {
      Object.assign(state.data, { [payload.id]: payload });
      return Object.assign({}, state, { loading: false });
    }
  },
  initial
);
