import { USER_LOGIN } from "../actions/actionTypes";

const initialState = {
  user: null
};
const login = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, user: action.user };
    default:
      return state;
  }
};
export default login;
