import constants from "../actions/constants";

const initialState = {
    selectedGrowboxId: "",
    items: [
        {
            id: "x",
            itemId: "554",
            water: 60,
            state: 50
        }
    ]
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_GROWBOX:
            return {...state, selectedGrowboxId: action.id}

        case constants.RESET_GROWBOXMENU:
            return {...state, items: []}

        case constants.ADD_GROWBOXMENU_ITEM:
            let itemExisting = state.items.find(x => x.id == action.id);
            if(itemExisting != null) {
                itemExisting.water = action.water;
                itemExisting.state = action.state;
            } else {
                state.items.push({id: action.id, itemId: action.itemId, water: action.water, state: action.state});
            }
            return {...state, items: state.items}

        case constants.UPDATE_GROWBOXMENU_ITEM:
            let item = state.items.find(x => x.id == action.id);
            item.water = action.water;
            item.state = action.state;
            return { ...state, items: [...state.items] }

        default: return state;
    }
}