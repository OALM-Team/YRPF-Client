import constants from "../actions/constants";

const initialState = {
    items: [
        {text: "Allumer/Eteindre", action: 'window.CallEvent("RemoteCallInterface", "Radio:ToogleRadio");'}
    ]
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.CLEAR_GENERIC_MENU:
            return {...state, items: []}

        case constants.ADD_GENERIC_MENU_ITEM:
            return {...state, items: [...state.items, {text: action.text, action: action.action}]}

        default: return state;
    }
}