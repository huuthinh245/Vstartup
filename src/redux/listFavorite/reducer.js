import { handleActions } from 'redux-actions';

export const GET_LIST_FAVORITE_SUCCESS = 'GET_LIST_FAVORITE_SUCCESS';
export const REFRESH_LIST_FAVORITE_SUCCESS = 'REFRESH_LIST_FAVORITE_SUCCESS';

export const listFavoriteReducer = handleActions(
  {
    [GET_LIST_FAVORITE_SUCCESS]: (state, { payload }) => {
      payload.forEach(item => {
        const index = state.findIndex(i => i.id === item.id);
        if (index === -1) {
          state.splice(0, 0, item);
        }
      });
    },
    [REFRESH_LIST_FAVORITE_SUCCESS]: (state, { payload }) => payload
  },
  []
);
