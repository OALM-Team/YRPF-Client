import constants from "../actions/constants";
import { toast } from 'react-toastify';

console.log();

const initialState = {
    inventory: false,
    atm: false,
    garage: false,
    vseller: false,
    customCharacter: false,
    vchest: false,
    map: true,
    bigmap: false,
    death: false,
    characterjob: false,
    seller: false,
    langSelector: false,
    statewindow: false,
    growboxmenu: false,
    foodbar: true,
    phone: process.env.NODE_ENV == "development" ? true : false,
    houseBuy: false,
    welcomeScreen: true,
    uiPosition: {
        inventory: {x: 400, y: 250},
        atm: {x: 400, y: 50},
        garage: {x: 400, y: 100},
        vseller: {x: 400, y: 100},
        customCharacter: {x: 400, y: 100},
        vchest: {x: 400, y: 100},
        bigmap: {x: 500, y: 250},
        death: {x: 500, y: 200},
        characterjob: {x: 500, y: 200},
        seller: {x: 500, y: 200},
        langSelector: {x: 500, y: 200},
        growboxmenu: {x: 500, y: 200},
        phone: {x: 500, y: 200},
        houseBuy: {x: 500, y: 200}
    }
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_WINDOW_STATE:
            return { ...state, [action.windowType]: action.windowState }

        case constants.UPDATE_UI_POSITION:
            state.uiPosition[action.windowType] = {x: action.x, y: action.y}
            return { ...state, uiPosition: state.uiPosition }

        case constants.ADD_TOAST:
            switch(action.notifType) {
                case "info":
                    toast.info(action.message);
                    break;

                case "success":
                    toast.success(action.message);
                    break;

                case "warn":
                    toast.warn(action.message);
                    break;

                case "error":
                    toast.error(action.message);
                    break;

                case "default":
                    toast(action.message);
                    break;
            }
            return { ...state }

        default: return state;
    }
}