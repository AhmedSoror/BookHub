import {
  ENTER_USERNAME,
  ENTER_PASSWORD,
  REMEMBER_ME,
  USER_FORGOT_PASSWORD,
  AUTH_USER
} from "../actions/actionTypes";

const initialState = {
  userName: "",
  password: "",
  isRememberMe: false,
  forgotPasswordModalVisible: false,
  authToken:""
};
const login = (state = initialState, action) => {
  switch (action.type) {
    case ENTER_USERNAME:
      return { ...state, userName: action.userName };
    case ENTER_PASSWORD:
      return { ...state, password: action.password };
    case REMEMBER_ME:
      return { ...state, isRememberMe: action.isRememberMe };
    case USER_FORGOT_PASSWORD:
      return { ...state, forgotPasswordModalVisible: action.isForgotPassword };
    case AUTH_USER:
      return {...state, authToken: action.authToken}
    default:
      return state;
  }
};
export default login;
