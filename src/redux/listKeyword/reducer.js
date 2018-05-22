import { handleActions } from 'redux-actions';

import { GET_LIST_KEYWORD, GET_LIST_KEYWORD_SUCCESS, GET_LIST_KEYWORD_FAILURE } from './actions';

const initial = {
  fetching: false,
  deleting: false,
  data: []
};

export const listKeywordReducer = handleActions(
  {
    [GET_LIST_KEYWORD]: state => {
      return Object.assign({}, state, { fetching: true });
    },
    [GET_LIST_KEYWORD_SUCCESS]: (state, { payload }) => {
      const arr = state.data;
      payload.forEach(item => {
        const index = arr.findIndex(i => i.id === item.id);
        if (index === -1) {
          arr.splice(0, 0, item);
        } else {
          Object.assign(arr[index], item);
        }
      });
      return Object.assign({}, state, { fetching: false, data: arr });
    },
    [GET_LIST_KEYWORD_FAILURE]: state => {
      return Object.assign({}, state, { fetching: false });
    }
  },
  initial
);
