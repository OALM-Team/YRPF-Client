import constants from "../actions/constants";
import * as i18n from "../i18n";

const initialState = {
    currentLang: "fr"
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_LANG:
            setTimeout(() => {
                i18n.syncWithLua();
            }, 500)
            return {...state, currentLang: action.lang}

        default: return state;
    }
}