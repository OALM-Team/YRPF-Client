import constants from "../actions/constants";

const initialState = {
    garageName: "",
    costToUse: 0,
    vehicles: []
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_GARAGE_INFOS:
            return { ...state, garageName: action.garageName, costToUse: action.costToUse }

        case constants.RESET_GARAGE_VEHICLE:
                return { ...state, vehicles: [] }

        case constants.ADD_GARAGE_VEHICLE:
            state.vehicles.push({uuid: action.uuid, modelId: action.modelId, color: action.color, plate: action.plate})
            return { ...state, vehicles: state.vehicles }

        default: return state;
    }
}