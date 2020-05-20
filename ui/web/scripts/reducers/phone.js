import constants from "../actions/constants";

const initialState = {
    contacts: [
        {name: "Borris Johnson", number: "0780521432"}
    ]
    
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {


        default: return state;
    }
}