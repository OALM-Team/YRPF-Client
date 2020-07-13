import constants from "../actions/constants";

const initialState = {
    isFirstSpawn: false,
    characterPosition: {
        x:0,y:0
    },
    heading: 100,
    cameraHeading: 0,
    zones: [],
    markers: []
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.UPDATE_CHARACTER_POSITION:
            return {...state, characterPosition: {x: action.x, y: action.y}}

        case constants.UPDATE_CHARACTER_HEADING:
            return {...state, heading: action.heading, cameraHeading: action.cameraHeading}

        case constants.GAMEMAP_ADD_ZONE:
            state.zones.push(action.zone);
            return {...state, zones: state.zones}

        case constants.GAMEMAP_ADD_MARKER:
            state.markers.push(action.marker);
            return {...state, markers: state.markers}

        default: return state;
    }
}