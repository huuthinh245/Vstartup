import { handleActions } from 'redux-actions';

export const SAVE_AUTH = 'SAVE_AUTH';

export const authReducer = handleActions(
  {
    [SAVE_AUTH]: (state, { payload }) => payload
  },
  {}
);
