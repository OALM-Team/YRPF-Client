import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Link
} from "react-router-dom";

class Compagny extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addMember: false,
            compagnyName: "",
            selectedInviteMember:  this.props.phone.contacts.length > 0 ? this.props.phone.contacts[0].number : ""
        }
    }

    componentDidUpdate() {
    }

    componentDidMount() {
        this.props.resetContacts();
        window.CallEvent("RemoteCallInterface", "Phone:RequestContacts");
        window.CallEvent("SetInputMode", 2)
    }

    componentWillUnmount() {

    }

    onCompagnyNameChange(evt) {
        if (evt.target.value.length > 20) return;
        this.setState({ compagnyName: evt.target.value })
    }

    render() {
        return <div>
            <div className="app-bar app-icon-purple">
                Entreprise
            </div>
            <div className="app-container compagny-screen">
                {this.props.phone.compagny.id == -1 ? <div>
                    <div style={{ textAlign: "center", marginTop: "10px", fontSize: "19px" }}>
                        Créer votre entreprise
                    </div>
                    <input type="text" placeholder="Nom de votre entreprise" style={{ marginTop: "5px" }}
                        value={this.state.compagnyName} onChange={this.onCompagnyNameChange.bind(this)} />
                    <div className="ui-btn app-icon-purple" style={{ marginTop: "5px" }} onClick={() => {
                        if (this.state.compagnyName == "") return;
                        window.CallEvent("RemoteCallInterface", "Compagny:Create", this.state.compagnyName.trim());
                    }}>
                        Créer (10000$)
                    </div>
                </div> : <div>
                        {this.state.addMember ? <div>
                            <div style={{ textAlign: "center", marginTop: "10px", fontSize: "19px" }}>
                                Inviter un employé depuis vos contacts
                            </div>
                            <select value={this.state.selectedInviteMember} onChange={(evt) => {
                                this.setState({ selectedInviteMember: evt.target.value })
                            }}>
                                {this.props.phone.contacts.map((e, i) => {
                                    return <option value={e.number} key={i}>
                                        {e.name}
                                    </option>
                                })}
                            </select>
                            <div className="ui-btn app-icon-purple" style={{ marginTop: "5px" }} onClick={() => {
                                window.CallEvent("RemoteCallInterface", "Compagny:InviteEmployee", this.state.selectedInviteMember);
                                this.setState({addMember: false})
                            }}>
                                Inviter
                            </div>
                        </div> : <div>
                                <div className="compagny-name app-icon-purple">{this.props.phone.compagny.name}</div>
                                <div className="compagny-money">Compte banquaire : <b>{this.props.phone.compagny.bankCash}$</b></div>
                                <div style={{ marginTop: "10px" }}>
                                    {this.props.phone.compagny.employees.map((e, i) => {
                                        return <div className="employee-item" key={i}>
                                            <div className={"letter-circle " + (e.online ? "app-icon-green" : "app-icon-red")} style={{ color: "white" }}>{e.name[0].toUpperCase()}</div>
                                            <div className="contact-name">
                                                <div style={{ minWidth: "150px", display: "inline-block" }}>{e.name}</div>

                                                {this.props.phone.compagny.myrank == 1 ? <FontAwesomeIcon icon={faTimes} style={{ color: "red", cursor: "pointer" }}
                                                    onClick={() => {
                                                        window.CallEvent("RemoteCallInterface", "Compagny:KickEmployee", e.steamid);
                                                    }} /> : null}
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>}
                    </div>}
            </div>


            {this.props.phone.compagny.id == -1 || this.props.phone.compagny.myrank != 1 ? null : <div className="bubble-bt app-icon-purple" onClick={() => this.setState({ addMember: !this.state.addMember })}>
                <FontAwesomeIcon icon={faPlus} />
            </div>}
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
        resetContacts: () => dispatch({type: constants.RESET_CONTACTS}),
        setPhoneScreen: (screen, params) => dispatch({ type: constants.SET_PHONE_SCREEN, currentScreen: screen, params: params })
    }
})(Compagny);