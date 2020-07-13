import * as React from "react";
import { connect } from "react-redux";
import { UIWindow } from "../../components";
import constants from "../../actions/constants";
import { KeyPad } from "../../components";
import * as i18n from "../../i18n";
import { faPiggyBank, faMoneyBill, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ATM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            operationType: "withdraw",
            value: ""
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1);
        window.CallEvent("RemoteCallInterface", "ATM:GetInfos");
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    deposit() {
        if (this.state.value.trim() == "") return;
        if (parseInt(this.state.value) <= 0) return;
        window.CallEvent("RemoteCallInterface", "ATM:Deposit", parseInt(this.state.value));
        this.setState({ value: "", operationType: "" });
        setTimeout(() => {
            window.CallEvent("RemoteCallInterface", "ATM:GetInfos");
            this.setState({ value: "", operationType: "deposit" });
        }, 300)
    }

    withdraw() {
        if (this.state.value.trim() == "") return;
        if (parseInt(this.state.value) <= 0) return;
        window.CallEvent("RemoteCallInterface", "ATM:Withdraw", parseInt(this.state.value));
        this.setState({ value: "", operationType: "" });
        setTimeout(() => {
            window.CallEvent("RemoteCallInterface", "ATM:GetInfos");
            this.setState({ value: "", operationType: "withdraw" });
        }, 300)
    }

    render() {
        return <UIWindow type="atm" title={i18n.t("ui.atm.windowName", [])} width="450px" height="290px"
            x={this.props.uiModules.uiPosition.atm.x}
            y={this.props.uiModules.uiPosition.atm.y}
            onPositionUpdated={(x, y) => {
                this.props.updateUIPosition(x, y);
            }}
        >
            <div className="side-menu">
                <div className={"side-menu-item " + (this.state.operationType == "withdraw" ? "selected":"")}
                    onClick={() => {this.setState({operationType: "withdraw"})}}>
                    <FontAwesomeIcon icon={faArrowDown} /> Retrait
                </div>
                <div className={"side-menu-item " + (this.state.operationType == "deposit" ? "selected":"")}
                    onClick={() => {this.setState({operationType: "deposit"})}}>
                    <FontAwesomeIcon icon={faArrowUp} /> Depôt
                </div>

                
                <div className="side-menu-item-space"></div>
                <div className="side-menu-item">
                    <FontAwesomeIcon icon={faPiggyBank} /> Banque
                </div>
                <div className="side-menu-item" style={{textAlign: "center"}}>
                    {this.props.atm.amount}$
                </div>
                <div className="side-menu-item">
                    <FontAwesomeIcon icon={faMoneyBill} /> Cash
                </div>
                <div className="side-menu-item" style={{textAlign: "center"}}>
                    {this.props.atm.cashAmount}$
                </div>
            </div>
            <div className="atm side-content">
                {(() => {
                    switch (this.state.operationType) {
                        case "withdraw": return this.renderWithdraw(); 
                        case "deposit": return this.renderDeposit(); 
                    }
                })()}
            </div>
        </UIWindow>
    }

    renderWithdraw() {
        return <div>
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
        </div>
    }

    renderDeposit() {
        return <div>
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
        </div>
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
        updateUIPosition: (x, y) => dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "atm", x, y }),
    }
})(ATM);