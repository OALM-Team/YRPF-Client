import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Message extends React.Component {

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
            <div className="app-bar app-icon-red">
                De {this.props.phone.contacts.find(x => x.number == this.props.match.params[0]) ? this.props.phone.contacts.find(x => x.number == this.props.match.params[0]).name : this.props.match.params[0]}
                <div style={{position: "absolute", right: "15px", bottom: "10px", cursor: "pointer"}}>
                    <Link to={"/call/" + this.props.match.params[0]}>
                        <FontAwesomeIcon icon={faPhoneAlt} />
                    </Link>
                </div>
            </div>
            <div className="app-container">

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
})(Message);