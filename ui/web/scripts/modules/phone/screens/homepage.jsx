import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faEnvelope, faLifeRing, faHeadset, faBook, faMap, faShoppingCart, faBuilding } from '@fortawesome/free-solid-svg-icons'
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

                    <div className="app-icon app-icon-blue" onClick={() => this.props.setPhoneScreen("item-shop")}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                        <div className="text">
                            Amozon
                        </div>
                    </div>
                    <div className="app-icon app-icon-purple" onClick={() => this.props.setPhoneScreen("compagny")}>
                        <FontAwesomeIcon icon={faBuilding} />
                        <div className="text">
                            Entreprise
                        </div>
                    </div>
                </div>

                

                <div style={{position: "absolute", bottom: "30px", left: "0px", right: "0px", textAlign: "center"}}>
                    <div className="app-icon app-icon-green" onClick={() => this.props.setPhoneScreen("call")}>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                    </div>
                    <div className="app-icon app-icon-red" onClick={() => this.props.setPhoneScreen("message-list")}>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    <div className="app-icon app-icon-red"  onClick={() => this.props.setPhoneScreen("urgency")}>
                        <FontAwesomeIcon icon={faLifeRing} />
                    </div>
                    <div className="app-icon app-icon-blue"  onClick={() => this.props.setPhoneScreen("urgency-list")}>
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