import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegiterReducer } from "./reducers/userReducers";
import { noteCreateReducer, noteListReducer } from "./reducers/noteReducers";

const reducers = combineReducers({
  //this will contain our reducers
  userLogin: userLoginReducer,
  userRegister: userRegiterReducer,
  noteList: noteListReducer,
  noteCreate: noteCreateReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
