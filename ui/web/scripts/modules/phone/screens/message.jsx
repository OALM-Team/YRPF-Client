import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Message extends React.Component {

    constructor(props) {
        super(props);
        this.messagesContainer = null;
        this.state = {
            messageText: ""
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        setTimeout(() => {
            this.scrollToBottom();
        }, 1000);
        window.CallEvent("SetInputMode", 2)
        this.props.resetMessages();
        window.CallEvent("RemoteCallInterface", "Phone:RequestConversation", this.props.phone.currentScreenParam)
    }

    componentWillUnmount() {
        
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    handleMessageTextChange(evt) {
        if(evt.target.value.length > 100) return;
        this.setState({messageText: evt.target.value})
    }

    onSendRequest() {
        if(this.state.messageText.length <= 0) return;
        window.CallEvent("RemoteCallInterface", "Phone:RequestSendMessage", JSON.stringify({number: this.props.phone.currentScreenParam, message: this.state.messageText}))
        this.setState({messageText: ""})
    }

    onInputKeyDown(evt) {
        if(evt.key == "Enter") this.onSendRequest();
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-red">
                De {this.props.phone.contacts.find(x => x.number == this.props.phone.currentScreenParam) ? this.props.phone.contacts.find(x => x.number == this.props.phone.currentScreenParam).name : this.props.phone.currentScreenParam}
                <div style={{position: "absolute", right: "15px", bottom: "10px", cursor: "pointer"}} onClick={() => this.props.setPhoneScreen("call", this.props.phone.currentScreenParam)}>
                    <FontAwesomeIcon icon={faPhoneAlt} />
                </div>
            </div>
            <div className="app-container message-screen">
                <div style={{paddingBottom: "50px", overflow: "auto", height: "370px"}} ref={(el) => { this.messagesContainer = el; }}>
                    {this.props.phone.messages.map((e,i) => {
                        return <div style={{textAlign: "right"}} key={i}>
                            <div className={"message-item " + (this.props.phone.phoneNumber == e.fromNumber ? "message-item-right":"")}>
                                {e.message}
                            </div>
                        </div>
                    })}
                </div>
            
                <div className="message-input-container">
                    <input onKeyDown={this.onInputKeyDown.bind(this)} type="text" placeholder="Votre message .." value={this.state.messageText} onChange={this.handleMessageTextChange.bind(this)} />
                    <div className="send-btn" onClick={this.onSendRequest.bind(this)}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
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
        resetMessages: () => dispatch({type: constants.RESET_PHONE_MESSAGE})
    }
})(Message);