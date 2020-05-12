import { createStore, combineReducers, applyMiddleware } from "redux";
import { uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob } from "../reducers";
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob
}), applyMiddleware(thunk));