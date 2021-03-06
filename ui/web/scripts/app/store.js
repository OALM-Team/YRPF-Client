import { createStore, combineReducers, applyMiddleware } from "redux";
import { uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob, 
    seller, i18n, growboxmenu, vehiclestate, foodbar, phone, house, atm, genericMenu } from "../reducers";
import thunk from 'redux-thunk';

export const store = createStore(combineReducers({
    uiModules, inventory, garage, vseller, vchest, map, xpbar, characterjob, seller, i18n, growboxmenu, vehiclestate, foodbar, phone, house, atm, genericMenu
}), applyMiddleware(thunk));