import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Urgency extends React.Component {

    constructor(props) {
        super(props);
        this.services = [
            {name: "Police", id: "police"},
            {name: "Hôpital", id: "hospital"}
        ]
        this.state = {
            serviceIndex: 0,
            text: "",
        }
    }
    
    componentDidUpdate() {
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 2)
    }

    componentWillUnmount() {
        
    }

    onRequestSend() {
        if(this.state.text.trim() == "") return;
        window.CallEvent("RemoteCallInterface", "Phone:RequestUrgency", JSON.stringify({service: this.services[this.state.serviceIndex].id,
             text: this.state.text.trim()}));
        this.props.setPhoneScreen("homepage")
    }
    
    render() {
        return <div> 
            <div className="app-bar app-icon-red">
                Urgences
            </div>
            <div className="app-container urgency-screen">
                <div style={{padding: "10px"}}>
                    <span>Quel service ?</span>
                    <br />
                    <select value={this.state.serviceIndex} onChange={(evt) => {
                        this.setState({serviceIndex: evt.target.value})
                    }}>
                        {this.services.map((e, i) => {
                            return <option value={i} value={i}>
                                {e.name}
                            </option>
                        })}
                    </select>
                    <br />
                    <br />
                    <span>Votre motif ?</span>
                    <br />
                    <textarea maxLength="100" value={this.state.text} onChange={(evt) => {
                        if(evt.target.value.length > 100) return;
                        this.setState({text: evt.target.value});
                    }} />
                    <br />
                    <br />
                    <div className="ui-btn app-icon-red" onClick={() => { this.onRequestSend(); }}>
                        Envoyer
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
        setPhoneScreen: (screen, params) => dispatch({type: constants.SET_PHONE_SCREEN, currentScreen: screen, params: params})
    }
})(Urgency);