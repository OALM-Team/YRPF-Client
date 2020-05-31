import constants from "../actions/constants";

const initialState = {
    amount: 11000,
    cashAmount: 100
}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch(action.type) {
        case constants.SET_BANK_CASH_AMOUNT:
            return {...state, amount: action.amount, cashAmount: action.cashAmount}

        default: return state;
    }
}