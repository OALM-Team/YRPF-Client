import constants from "../actions/constants";

const initialState = {
    food: 100,
    drink: 100
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_FOOD:
            return {...state, food: action.foodState, drink: action.drinkState}

        default: return state;
    }
}