import * as React from "react";
import { connect } from "react-redux";
import { UIWindow } from "../../components";
import constants from "../../actions/constants";
import {KeyPad} from "../../components";

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
        return <UIWindow type="atm" title="ATM" width="450px" height="160px"
            x={this.props.uiModules.uiPosition.atm.x} 
            y={this.props.uiModules.uiPosition.atm.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
                <div className="atm">
                    {this.state.operationType == null ? <div>
                            <div className="ribbon animated fadeIn">
                            Merci d'utiliser les ATM de Onset Paradise
                        </div>

                        <div className="animated fadeIn" style={{textAlign: "center", marginTop: "20px"}}>
                            <div className="atm-button" onClick={() => {
                                this.setState({value: "", operationType: "deposit"})
                            }}>
                                DEPOT
                            </div>
                            <div className="atm-button" onClick={() => {
                                this.setState({value: "", operationType: "withdraw"})
                            }}>
                                RETRAIT
                            </div>
                        </div>
                    </div> : null}

                    {this.state.operationType == "deposit" ? <div>
                        <input type="text" className="atm-textbox" value={this.state.value} onChange={() => {}} />
                        <br />
                        <KeyPad onContentChange={(content) => {
                            this.setState({value: content})
                        }} />
                        <br />
                        <div style={{textAlign: "center"}}>
                            <div className="atm-button" onClick={() => this.deposit()}>
                                DEPOSER
                            </div>
                        </div>
                    </div> : null}

                    {this.state.operationType == "withdraw" ? <div>
                        <input type="text" className="atm-textbox" value={this.state.value} onChange={() => {}} />
                        <br />
                        <KeyPad onContentChange={(content) => {
                            this.setState({value: content})
                        }} />
                        <br />
                        <div style={{textAlign: "center"}}>
                            <div className="atm-button" onClick={() => this.withdraw()}>
                                RETIRER
                            </div>
                        </div>
                    </div> : null}
                    
                </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "atm", x, y }),
    }
})(ATM);