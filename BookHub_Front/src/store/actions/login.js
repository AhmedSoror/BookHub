import { USER_LOGIN } from "./actionTypes";

export const userLogin = user => {
  return {
    type: USER_LOGIN,
    user: user
  };
};
