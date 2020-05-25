import constants from "../actions/constants";

const initialState = {
    housePrice: 0,
    houseName: "Batiment"
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case constants.SET_HOUSE_INFOS:
            return { ...state, housePrice: action.housePrice, houseName: action.houseName}

        default: return state;
    }
}