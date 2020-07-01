import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPhoneAlt, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Call extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            numberInput: props.phone.currentScreenParam == null || props.phone.currentScreenParam == "" ? "" : props.phone.currentScreenParam
        }
    }
    
    componentDidUpdate() {
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        this.checkPhoneCallState();
    }

    componentWillUnmount() {
        
    }

    checkPhoneCallState() {
        if(this.props.phone.inCallState != -1) {
            this.props.setPhoneScreen("in-call")
        }
    }

    onNumpadBack() {
        if((this.state.numberInput).length == 0) return;
        this.setState({numberInput: this.state.numberInput.substring(0, this.state.numberInput.length - 1)})
    }

    onNumpadPress(value) {
        if((this.state.numberInput + value).length > 10) return;
        this.setState({numberInput: this.state.numberInput + value})
    }

    handleRequestCall() {
        if(this.state.numberInput == "") return;
        window.CallEvent("RemoteCallInterface", "Phone:RequestCall", this.state.numberInput);
    }

    render() {
        return <div> 
            <div className="app-bar app-icon-green">
                Téléphone
            </div>
            <div className="app-container call-screen">
                <div className="your-number">Votre numéro<br/><span>
                    {[this.props.phone.phoneNumber.slice(0, 2), this.props.phone.phoneNumber.slice(2,4), this.props.phone.phoneNumber.slice(4,6), this.props.phone.phoneNumber.slice(6,8), this.props.phone.phoneNumber.slice(8,10)].join(' ')}
                </span></div>
                <input className="numpad-number" type="text" placeholder="..."
                    value={[this.state.numberInput.slice(0, 2), this.state.numberInput.slice(2,4), this.state.numberInput.slice(4,6), this.state.numberInput.slice(6,8), this.state.numberInput.slice(8,10)].join(' ')} readOnly style={{fontSize: (40 - this.state.numberInput.length) + "px"}} />
                <div className="numpad">
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("1")}}>1</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("2")}}>2</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("3")}}>3</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("4")}}>4</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("5")}}>5</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("6")}}>6</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("7")}}>7</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("8")}}>8</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("9")}}>9</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadPress("0")}}>0</div>
                    <div className="numpad-btn" onClick={() => {this.onNumpadBack()}}>
                        <FontAwesomeIcon icon={faBackspace} />
                    </div>
                </div>
            </div>
            <div className="bubble-bt app-icon-green" onClick={() => this.handleRequestCall()}>
                <FontAwesomeIcon icon={faPhoneAlt} />
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
})(Call);