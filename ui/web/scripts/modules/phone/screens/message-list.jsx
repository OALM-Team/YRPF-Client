import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {
        this.props.resetConversations();
        window.CallEvent("RemoteCallInterface", "Phone:RequestConversationsList");
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-red">
                Messages
            </div>
            <div className="app-container message-list-screen">
                {this.props.phone.conversations.map((e,i) => {
                    return <div className="conversation-item" key={i} onClick={() => this.props.setPhoneScreen("message", e.number)}>
                        <div className="letter-circle">{this.props.phone.contacts.find(x => x.number == e.number) ? this.props.phone.contacts.find(x => x.number == e.number).name[0].toUpperCase() : "?"}</div>
                        <div className="contact-name">
                            {this.props.phone.contacts.find(x => x.number == e.number) ? this.props.phone.contacts.find(x => x.number == e.number).name : e.number}<br />
                            <span>{e.lastMessage.length > 27 ? e.lastMessage.substring(0, 27) + "..." : e.lastMessage}</span>
                        </div>
                    </div>
                })}
                
            </div>
            <div className="bubble-bt app-icon-red" onClick={() => this.props.setPhoneScreen("addContact")}>
                <FontAwesomeIcon icon={faPlus} />
            </div>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        phone: state.phone
    }
}, (dispatch) => {
    return {
        setPhoneScreen: (screen, params) => dispatch({type: constants.SET_PHONE_SCREEN, currentScreen: screen, params: params}),
        resetConversations: () => dispatch({type: constants.RESET_PHONE_CONVERSATIONS})
    }
})(MessageList);