import { combineReducers } from "redux";
import authReducer from "./Auth.reducers";
import levelUpReducer from "./LevelUp.reducer";
import subjectsReducer from "./Subjects.reducer";
import SubscriptionReducer from "./Subscription.reducers";
import topicsReducer from "./Topics.reducer";

import videosReducer from "./Videos.reducer";

const rootReducer = combineReducers({
  videos: videosReducer,
  auth: authReducer,
  levelUp: levelUpReducer,
  subjects: subjectsReducer,
  topics: topicsReducer,
  subscription: SubscriptionReducer,
});

export default rootReducer;
