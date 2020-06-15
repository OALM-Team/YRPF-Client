import constants from "../actions/constants";

const initialState = {
    currentScreen: "homepage",
    phoneNumber: "0788253614",
    currentScreenParam: null,
    inCallWith: "0780521432",
    inCallState: -1,
    phoneCallStartTime: new Date().getTime(),
    contacts: [
        { id: 1, name: "Borris Johnson", number: "0780521432" }
    ],
    conversations: [
        { number: "0780521432", lastMessage: "Salut la forme mon pote ? ça fait longtemps" }
    ],
    messages: [
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" },
        { messageType: 1, fromNumber: "0788253613", message: "Je suis un message de test 3" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" },
        { messageType: 1, fromNumber: "0788253613", message: "Je suis un message de test 3" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" },
        { messageType: 1, fromNumber: "0788253613", message: "Je suis un message de test 3" },
        { messageType: 1, fromNumber: "0788253614", message: "Je suis un message de test 2" }
    ]

}

export default (state, action) => {
    if (typeof state === 'undefined') {
        return initialState
    }
    switch (action.type) {
        case constants.ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, { id: action.id, name: action.name, number: action.number }] }

        case constants.RESET_CONTACTS:
            return { ...state, contacts: [] }

        case constants.SET_PHONE_SCREEN:
            return { ...state, currentScreen: action.currentScreen, currentScreenParam: action.params }

        case constants.ADD_PHONE_MESSAGE:
            return {
                ...state, messages: [...state.messages,
                {
                    messageType: action.messageType,
                    fromNumber: action.fromNumber,
                    message: action.message
                }
                ]
            }

        case constants.RESET_PHONE_MESSAGE:
            return { ...state, messages: [] }

        case constants.RESET_PHONE_CONVERSATIONS:
            return { ...state, conversations: [] }

        case constants.ADD_PHONE_CONVERSATIONS:
            return {
                ...state, conversations: [...state.conversations,
                {
                    number: action.number,
                    lastMessage: action.lastMessage
                }
                ]
            }

        case constants.SET_PHONE_NUMBER:
            return { ...state, phoneNumber: action.phoneNumber }

        case constants.START_PHONE_CALL_TIMER:
            return { ...state, phoneCallStartTime: new Date().getTime(), currentScreen: "in-call" }

        case constants.SET_PHONE_CALL_STATE:
            return { ...state, inCallState: action.inCallState, inCallWith: action.inCallWith}

        default: return state;
    }
}