import constants from "../actions/constants";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    items: []
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.ADD_XPBAR_ITEM:
            let uuid = uuidv4();
            state.items.push({text: action.text, uuid: uuid});
            setTimeout(() => {
                require("../app/store").store.dispatch({type: constants.REMOVE_XPBAR_ITEM, uuid: uuid})
            }, 5000);
            return {...state, items: state.items}

        case constants.REMOVE_XPBAR_ITEM:
            let toRemoteItem = state.items.find(x => x.uuid == action.uuid);
            state.items.splice(state.items.indexOf(toRemoteItem), 1);
            return { ...state, items: [...state.items] }

        default: return state;
    }
}