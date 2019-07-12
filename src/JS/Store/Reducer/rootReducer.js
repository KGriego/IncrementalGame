import { combineReducers } from "redux";

import { reducer as notifications } from "../Module/Notifications";
import { reducer as initialReducer } from "./initialReducer";
import { reducer as researchReducer } from "./researchReducer";

const rootReducer = combineReducers({
  initialReducer,
  notifications,
  researchReducer
});

export default rootReducer;
