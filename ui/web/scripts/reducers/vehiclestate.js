import constants from "../actions/constants";

const initialState = {
    visible: true,
    currentMph: 100,
    maxMph: 400,
    lightState: false,
    fuel: 60
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_VEHICLE_STATE:
            return {...state, visible: action.visible, currentMph: action.currentMph, lightState: action.lightState, fuel: action.fuel}

        default: return state;
    }
}