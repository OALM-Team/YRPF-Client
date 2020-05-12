import constants from "../actions/constants";

const initialState = {
    vehicles: []
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.ADD_VSELLER_VEHICLE:
            state.vehicles.push({modelId: action.modelId, price: action.price, name: action.name, 
                description: action.description})
            return { ...state, vehicles: state.vehicles }

        case constants.RESET_VSELLER_VEHICLE:
            state.vehicles = [];
            return { ...state, vehicles: state.vehicles }

        default: return state;
    }
}