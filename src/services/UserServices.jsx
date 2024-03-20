import { API } from "./api";

export const UserServices = {
  loginUser(form) {
    return API.post("/auth/login", form);
  },
  fetchMe: (token) => {
    return API.get("/authentication/get-user", {
      //login/
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  registerUser: (form) => {
    return API.post("/authentication/register-user", form);
  },
};
