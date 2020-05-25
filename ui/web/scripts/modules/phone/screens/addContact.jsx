import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class AddContacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            number: ""
        }
    }
    
    componentDidMount() {
        window.CallEvent("SetInputMode", 2)
    }

    componentWillUnmount() {
        
    }

    handleOnNameChange(evt) {
        if(evt.target.value.length > 15) return;
        this.setState({name: evt.target.value})
    }

    handleOnNumberChange(evt) {
        if(evt.target.value.length > 10) return;
        this.setState({number: evt.target.value})
    }

    submitRequest() {
        if(this.state.name.trim() == "" || this.state.number.trim() == "") return;
        window.CallEvent("RemoteCallInterface", "Phone:AddContact", JSON.stringify({name: this.state.name.trim(), number: this.state.number.trim()}));
        this.props.setPhoneScreen("contacts");
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-yellow">
                Ajouter un contact
            </div>
            <div className="app-container">
                <div style={{marginLeft: "10px", marginRight: "10px", marginTop:"15px"}}>
                    <input type="text" placeholder="Nom du contact" value={this.state.name} onChange={this.handleOnNameChange.bind(this)} />
                    <input type="text" placeholder="Numéro de téléphone" value={this.state.number} onChange={this.handleOnNumberChange.bind(this)} />
                    <div className="ui-btn app-icon-yellow" onClick={this.submitRequest.bind(this)}>
                        Sauvegarder
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
})(AddContacts);