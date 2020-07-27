import constants from "../actions/constants";
import assets from "../assets"

const initialState = {
    items: [
        { id: "eee", quantity: 1, itemId: "100001", name: "Banane" }
    ],
    currentWeight: 0,
    maxWeight: 100,
    hasBag: false,
    chestCurrentWeight: 10,
    chestMaxWeight: 150,
    chestItems: [
        { id: "zed", quantity: 10, itemId: "12", name: "Eau" }
    ]
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
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

        case constants.CLEAR_CHEST_CONTENT:
            return { ...state, chestItems: [] }

        case constants.SET_CHEST_WEIGHT:
            return { ...state, chestCurrentWeight: action.currentWeight, chestMaxWeight: action.maxWeight }

        case constants.ADD_ITEM_CHEST:
            return { ...state, chestItems: [...state.chestItems, action.item] }

        case constants.ADD_CUSTOM_ITEM_IMAGE:
            assets.items[action.id] = action.path;
            return { ...state }

        default: return state;
    }
}