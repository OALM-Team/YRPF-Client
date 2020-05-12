import constants from "./constants";

export const setWindowState = (windowType, windowState) => dispatch => {
    dispatch({type: constants.SET_WINDOW_STATE, windowType, windowState });
}