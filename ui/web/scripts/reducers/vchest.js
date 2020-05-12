import constants from "../actions/constants";

const initialState = {
    items: []
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.RESET_VCHEST:
            return {...state, items: []}

        case constants.ADD_VCHEST_ITEM:
            state.items.push({uuid: action.uuid, modelId: action.modelId, name: action.name})
            return {...state, items: state.items}

        default: return state;
    }
}