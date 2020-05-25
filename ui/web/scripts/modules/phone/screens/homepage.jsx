import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faEnvelope, faLifeRing, faHeadset, faBook, faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        window.CallEvent("RemoteCallInterface", "Phone:RequestContacts");
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div className="wallpaper">
            <div className="homepage">
                <div style={{padding: "5px"}}>
                    <div className="app-icon app-icon-yellow" onClick={() => this.props.setPhoneScreen("contacts")}>
                        <FontAwesomeIcon icon={faBook} />
                        <div className="text">
                            Contacts
                        </div>
                    </div>
                </div>

                

                <div style={{position: "absolute", bottom: "30px", left: "0px", right: "0px", textAlign: "center"}}>
                    <div className="app-icon app-icon-green" onClick={() => this.props.setPhoneScreen("call")}>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                    </div>
                    <div className="app-icon app-icon-blue" onClick={() => this.props.setPhoneScreen("message-list")}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="app-icon app-icon-red">
                        <FontAwesomeIcon icon={faLifeRing} />
                    </div>
                    <div className="app-icon app-icon-blue">
                        <FontAwesomeIcon icon={faHeadset} />
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
        setPhoneScreen: (screen) => dispatch({type: constants.SET_PHONE_SCREEN, currentScreen: screen}),
    }
})(Homepage);