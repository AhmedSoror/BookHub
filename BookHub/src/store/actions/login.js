import {
  ENTER_USERNAME,
  ENTER_PASSWORD,
  REMEMBER_ME,
  USER_FORGOT_PASSWORD,
  AUTH_USER
} from "./actionTypes";

//------------------------------ unused
export const enterUserName = text => {
  return {
    type: ENTER_USERNAME,
    userName: text
  };
};
export const enterPassword = text => {
  return {
    type: ENTER_PASSWORD,
    password: text
  };
};
export const rememberMe = isChecked => {
  return {
    type: REMEMBER_ME,
    isRememberMe: isChecked
  };
};
export const forgotPassword = isVisible => {
  return {
    type: USER_FORGOT_PASSWORD,
    isForgotPassword: isVisible
  };
};
//----------------------------
export const authUser = (token,user) => {
  return {
    type: AUTH_USER,
    authToken: token,
    user:user
  };
};
