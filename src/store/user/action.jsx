import { toast } from "react-toastify";
import { UserServices } from "../../services/UserServices";

export const ACT_USER_LOGIN = "ACT_USER_LOGIN";
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
