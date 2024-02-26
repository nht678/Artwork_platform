import { ACT_USER_LOGIN } from "./action";

const initialState = {
  fakeUser: [],
  users: [],
  token: null,
  currentUser: null,
  role: null,
  admin: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACT_USER_LOGIN:
      localStorage.setItem("ACCESS_TOKEN", action.payload.token);
      return {
        ...state,
        currentUser: action.payload.currentUser,
        token: action.payload.token,
        role: action.payload.role,
      };
    default:
      return state;
  }
};

export default UserReducer;
