import { toast } from "react-toastify";
import { UserServices } from "../../services/UserServices";

export const ACT_USER_LOGIN = "ACT_USER_LOGIN";
export const ACT_USER_REGISTER = "ACT_USER_REGISTER";
export function actUserLogin(currentUser, token, role) {
  return {
    type: ACT_USER_LOGIN,
    payload: {
      currentUser,
      token,
      role,
    },
  };
}
export function actUserRegister(message) {
  return {
    type: ACT_USER_REGISTER,
    payload: {
      message,
    },
  };
}
