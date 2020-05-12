import constants from "../actions/constants";

const initialState = {
    items: [
        //{jobId: "LUMBERJACK", xp: 500, level: 1, levelName: "Bucheron débutant"},
        //{jobId: "FISHER", xp: 650, level: 1, levelName: "Pêcheur débutant"},
        //{jobId: "MINER", xp: 100, level: 1, levelName: "Mineur débutant"}
    ]
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.RESET_CHARACTERJOB:
            return {...state, items: []}

        case constants.ADD_CHARACTERJOB_ITEM:
            state.items.push({jobId: action.jobId, xp: action.xp, level: action.level, levelName: action.levelName});
            return {...state, items: state.items}

        default: return state;
    }
}