import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import userReducer from "../store/user/reducer"; // dang loi cho store nhe!
const rootReducer = combineReducers({
  USER: userReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
