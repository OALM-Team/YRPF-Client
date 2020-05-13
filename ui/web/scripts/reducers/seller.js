import constants from "../actions/constants";

const initialState = {
    items: [
        {id: "1", name: "Pomme", price: -5},
        {id: "6", name: "Banane", price: -10},
        {id: "4", name: "Hache de bûcheron", price: 75},
        {id: "5", name: "Pioche de mineur", price: 75}
    ]
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.RESET_SELLER:
            return {...state, items: []}

        case constants.ADD_SELLER_ITEM:
            state.items.push({id: action.id, name: action.name, price: action.price});
            return {...state, items: state.items}

        default: return state;
    }
}