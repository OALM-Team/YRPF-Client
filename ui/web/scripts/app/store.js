import { createStore, combineReducers, applyMiddleware } from "redux";
import { uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob, seller, i18n, growboxmenu, vehiclestate } from "../reducers";
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob, seller, i18n, growboxmenu, vehiclestate
}), applyMiddleware(thunk));