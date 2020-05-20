import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Contacts extends React.Component {

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
        return <div> 
            <div className="app-bar app-icon-yellow">
                Contacts
            </div>
            <div className="app-container contacts-screen">
                {this.props.phone.contacts.map((e,i) => {
                    return <Link to={"/message/"+ e.number} key={i}>
                        <div className="contact-item">
                            <div className="letter-circle">{e.name[0].toUpperCase()}</div>
                            <div className="contact-name">{e.name}</div>
                        </div>
                    </Link>
                })}
            </div>
            <div className="bubble-bt app-icon-yellow">
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
        
    }
})(Contacts);