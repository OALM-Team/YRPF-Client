import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class InCall extends React.Component {

    constructor(props) {
        super(props);
        this.refreshInterval = null;
        this.state = {
            computedTime: "00:00"
        }
    }

    refreshCallTime() {

    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1);

        this.refreshInterval = setInterval(() => {
            let currentTime = new Date().getTime();
            let callTime = currentTime - this.props.phone.phoneCallStartTime;
            this.setState({computedTime: this.msToTime(callTime)})
        }, 1000);
    }

    msToTime(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds = Math.floor((duration / 1000) % 60),
            minutes = Math.floor((duration / (1000 * 60)) % 60),
            hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return minutes + ":" + seconds;
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    render() {
        return <div>
            <div className="incall-screen">
                <div className="background-blurred"></div>
                <div className="content-container">
                    <div className="contact-name">
                        {this.props.phone.contacts.find(x => x.number == this.props.phone.inCallWith) ? this.props.phone.contacts.find(x => x.number == this.props.phone.inCallWith).name : this.props.phone.inCallWith}
                    </div>
                    <div className="timer">
                        {(() => {
                            switch(this.props.phone.inCallState) {
                                case -1:
                                    return null;

                                case 1:
                                    return "En attente du correspondant .."

                                case 2:
                                    return "Appel entrant .."

                                case 3:
                                    return this.state.computedTime;
                            }
                        })()}
                    </div>

                    <div style={{ textAlign: "center", marginTop: "150px" }}>
                        {(() => {
                            switch(this.props.phone.inCallState) {
                                case -1:
                                    return null;

                                case 1:
                                    return <div>
                                        <div className="numpad-btn numpad-btn-rotate app-icon-red" style={{transform: "rotate(135deg)"}} onClick={() => { window.CallEvent("RemoteCallInterface", "Phone:RequestEndCall"); }}>
                                            <FontAwesomeIcon icon={faPhoneAlt} />
                                        </div>
                                    </div>

                                case 2:
                                    return <div>
                                        <div className="numpad-btn app-icon-green" onClick={() => { window.CallEvent("RemoteCallInterface", "Phone:RequestAnswer"); }}>
                                            <FontAwesomeIcon icon={faPhoneAlt} />
                                        </div>
                                        <div style={{width: "30px", display: "inline-block"}} onClick={() => { window.CallEvent("RemoteCallInterface", "Phone:RequestEndCall"); }} />
                                        <div className="numpad-btn numpad-btn-rotate app-icon-red" style={{transform: "rotate(135deg)"}}>
                                            <FontAwesomeIcon icon={faPhoneAlt} />
                                        </div>
                                    </div>

                                case 3:
                                    return <div>
                                        <div className="numpad-btn numpad-btn-rotate app-icon-red" style={{transform: "rotate(135deg)"}} 
                                            onClick={() => { 
                                                window.CallEvent("RemoteCallInterface", "Phone:RequestEndCall");
                                                this.props.setPhoneScreen("call");
                                            }}>
                                            <FontAwesomeIcon icon={faPhoneAlt} />
                                        </div>
                                    </div>
                            }
                        })()}
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
})(InCall);