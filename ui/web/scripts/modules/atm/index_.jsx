import * as React from "react";
import { connect } from "react-redux";
import { UIWindow } from "../../components";
import constants from "../../actions/constants";
import {KeyPad} from "../../components";
import * as i18n from "../../i18n";

class ATM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operationType: null,
            value: ""
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }
    
    deposit() {
        if(this.state.value.trim() == "") return;
        if(parseInt(this.state.value) <= 0) return;
        window.CallEvent("RemoteCallInterface", "ATM:Deposit", parseInt(this.state.value));
        this.setState({operationType: null, value: ""});
    }

    withdraw() {
        if(this.state.value.trim() == "") return;
        if(parseInt(this.state.value) <= 0) return;
        window.CallEvent("RemoteCallInterface", "ATM:Withdraw", parseInt(this.state.value));
        this.setState({operationType: null, value: ""});
    }

    render() {
        return <UIWindow type="atm" title={i18n.t("ui.atm.windowName", [])} width="450px" height="160px"
            x={this.props.uiModules.uiPosition.atm.x} 
            y={this.props.uiModules.uiPosition.atm.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
                <div className="atm">
                    {this.state.operationType == null ? <div>
                        <div className="ribbon animated fadeIn">
                            {i18n.t("ui.atm.greetings", [])}
                        </div>

                        <div className="animated fadeIn" style={{textAlign: "center", marginTop: "20px"}}>
                            <div className="atm-button" onClick={() => {
                                this.setState({value: "", operationType: "deposit"});
                                window.CallEvent("RemoteCallInterface", "ATM:GetInfos");
                            }}>
                                {i18n.t("ui.atm.deposit", [])}
                            </div>
                            <div className="atm-button" onClick={() => {
                                this.setState({value: "", operationType: "withdraw"});
                                window.CallEvent("RemoteCallInterface", "ATM:GetInfos");
                            }}>
                                {i18n.t("ui.atm.withdraw", [])}
                            </div>
                        </div>
                    </div> : null}

                    {this.state.operationType == "deposit" ? <div>
                        <div className="ribbon animated fadeIn">
                            {i18n.t("ui.atm.in_bank", [])} : <b>{this.props.atm.amount}$</b>
                        </div>
                        <div className="ribbon animated fadeIn">
                            {i18n.t("ui.atm.on_you", [])} : <b>{this.props.atm.cashAmount}$</b>
                        </div>

                        <input type="text" className="atm-textbox" value={this.state.value} onChange={() => {}} />
                        <br />
                        <KeyPad onContentChange={(content) => {
                            this.setState({value: content})
                        }} />
                        <br />
                        <div style={{textAlign: "center"}}>
                            <div className="atm-button" onClick={() => this.deposit()}>
                                {i18n.t("ui.atm.deposit", [])}
                            </div>
                        </div>
                    </div> : null}

                    {this.state.operationType == "withdraw" ? <div>
                        <div className="ribbon animated fadeIn">
                            {i18n.t("ui.atm.in_bank", [])} : <b>{this.props.atm.amount}$</b>
                        </div>
                        <div className="ribbon animated fadeIn">
                            {i18n.t("ui.atm.on_you", [])} : <b>{this.props.atm.cashAmount}$</b>
                        </div>

                        <input type="text" className="atm-textbox" value={this.state.value} onChange={() => {}} />
                        <br />
                        <KeyPad onContentChange={(content) => {
                            this.setState({value: content})
                        }} />
                        <br />
                        <div style={{textAlign: "center"}}>
                            <div className="atm-button" onClick={() => this.withdraw()}>
                                {i18n.t("ui.atm.withdraw", [])}
                            </div>
                        </div>
                    </div> : null}
                    
                </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        inventory: state.inventory,
        atm: state.atm
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "atm", x, y }),
    }
})(ATM);