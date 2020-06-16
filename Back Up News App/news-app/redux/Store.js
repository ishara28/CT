import { createStore, combineReducers } from "redux";
import { themeReducer } from "./reducers/ThemeReducer";

const rootReducer = combineReducers({
  themeReducer: themeReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
