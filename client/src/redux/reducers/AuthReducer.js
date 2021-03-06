import * as types from '../types';

const initialState = {
  user: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.userName
      };
    default:
      return {
        ...state
      };
  }

}