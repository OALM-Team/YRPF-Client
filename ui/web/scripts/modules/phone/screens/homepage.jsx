import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faEnvelope, faLifeRing, faHeadset, faBook, faMap } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div className="wallpaper">
            <div className="homepage">
                <div style={{padding: "5px"}}>
                    <Link to="/contacts">
                        <div className="app-icon app-icon-yellow">
                            <FontAwesomeIcon icon={faBook} />
                            <div className="text">
                                Contacts
                            </div>
                        </div>
                    </Link>

                    <Link to="/gamemap">
                        <div className="app-icon app-icon-blue">
                            <FontAwesomeIcon icon={faMap} />
                            <div className="text">
                                Carte
                            </div>
                        </div>
                    </Link>
                </div>

                

                <div style={{position: "absolute", bottom: "30px", left: "0px", right: "0px", textAlign: "center"}}>
                    <Link to="/call">
                        <div className="app-icon app-icon-green">
                            <FontAwesomeIcon icon={faPhoneAlt} />
                        </div>
                    </Link>
                    <div className="app-icon app-icon-blue">
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
        _: state.i18n
    }
}, (dispatch) => {
    return {
        
    }
})(Homepage);