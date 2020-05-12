import constants from "../actions/constants";

const initialState = {
    items: [],
    currentWeight: 0,
    maxWeight: 100
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.ADD_ITEM_INVENTORY:
            return { ...state, items: [...state.items, action.item] }

        case constants.UPDATE_ITEM_INVENTORY:
            state.items.find(x => x.id == action.item.id).quantity = action.item.quantity;
            return { ...state, items: [...state.items] }

        case constants.RESET_INVENTORY_ITEMS:
            return { ...state, items: [] }

        case constants.UPDATE_INVENTORY_WEIGHT:
            return { ...state, currentWeight: action.currentWeight, maxWeight: action.maxWeight }

        case constants.REMOVE_ITEM_INVENTORY:
            let toRemoteItem = state.items.find(x => x.id == action.id);
            state.items.splice(state.items.indexOf(toRemoteItem), 1);
            return { ...state, items: [...state.items] }

        default: return state;
    }
}