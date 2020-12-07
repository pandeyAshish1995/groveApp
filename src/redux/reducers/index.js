import { combineReducers } from "redux";
import VideoReducer from "./VideoReducer";
 import StripsReducer from "./StripReducer";
import { SIGNOUT } from "../constants";

const appReducer = combineReducers({
  video: VideoReducer,
  strips: StripsReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGNOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
