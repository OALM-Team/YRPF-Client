import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {
        this.props.resetContacts();
        window.CallEvent("RemoteCallInterface", "Phone:RequestContacts");
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-yellow">
                Contacts
            </div>
            <div className="app-container contacts-screen">
                {this.props.phone.contacts.map((e,i) => {
                    return <div className="contact-item" key={i} onClick={() => this.props.setPhoneScreen("message", e.number)}>
                        <div className="letter-circle">{e.name[0].toUpperCase()}</div>
                        <div className="contact-name">{e.name}</div>
                    </div>
                })}
            </div>
            <div className="bubble-bt app-icon-yellow" onClick={() => this.props.setPhoneScreen("addContact")}>
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
        resetContacts: () => dispatch({type: constants.RESET_CONTACTS})
    }
})(Contacts);