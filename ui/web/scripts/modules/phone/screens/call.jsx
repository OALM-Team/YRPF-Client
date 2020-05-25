import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faEnvelope, faLifeRing, faHeadset } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Call extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    componentDidUpdate() {
        window.CallEvent("SetInputMode", 1)
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-green">
                Téléphone
            </div>
            <div className="app-container">

            </div>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        
    }
})(Call);