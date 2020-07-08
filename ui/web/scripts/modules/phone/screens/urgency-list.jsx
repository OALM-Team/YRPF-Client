import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class UrgencyList extends React.Component {

    constructor(props) {
        super(props);
        this.services = []
        this.state = {

        }
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        window.CallEvent("RemoteCallInterface", "Phone:RequestListUrgency", "");
    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            <div className="app-bar app-icon-red">
                Liste des urgences
            </div>
            <div className="app-container urgency-list-screen">
                {this.props.phone.urgencyMessages.map((e, i) => {
                    return <div className="urgency-item" key={i}>
                        <div className="number" onClick={() => this.props.setPhoneScreen("call", e.from)}>
                            De <b>{e.from}</b>
                        </div>
                        <div className="urgency-content app-icon-red">
                            {e.text}
                        </div>
                        <div className="ui-btn app-icon-blue" style={{marginTop: "5px"}} onClick={() => {  
                            window.CallEvent("Local:Map:AddOrRemoveWaypoint", "Urgence", e.id, e.x, e.y, e.z)
                        }}>
                            Localiser
                        </div>
                        <div className="ui-btn app-icon-green" style={{marginTop: "5px"}} onClick={() => {  
                            window.CallEvent("RemoteCallInterface", "Phone:SolveUrgency", JSON.stringify({service: e.service, id: e.id}));
                        }}>
                            Résoudre
                        </div>
                    </div>
                })}
                
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
        setPhoneScreen: (screen, params) => dispatch({ type: constants.SET_PHONE_SCREEN, currentScreen: screen, params: params })
    }
})(UrgencyList);