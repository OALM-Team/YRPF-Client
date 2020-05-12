import * as React from "react";
import { connect } from "react-redux";
import constants from "../actions/constants";
import { setWindowState } from "../actions/ui_modules";
import { UIWindow } from "../components";
import {Inventory, ATM, Garage, VSeller, CustomCharacter, VChest, GameMap, XPBar, BigMap, Death, CharacterJob} from "./";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        window.CallEvent("RemoteCallInterface", "Global:UIReady");
        //this.props.setWindowState("inventory", true)
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {
        return <div>
            <ToastContainer position="bottom-right" pauseOnHover={false} pauseOnFocusLoss={false} />
            <XPBar />
            {this.props.uiModules.inventory ? <Inventory /> : null}
            {this.props.uiModules.atm ? <ATM /> : null}
            {this.props.uiModules.garage ? <Garage /> : null}
            {this.props.uiModules.vseller ? <VSeller /> : null}
            {this.props.uiModules.customCharacter ? <CustomCharacter /> : null}
            {this.props.uiModules.vchest ? <VChest /> : null}
            {this.props.uiModules.map ? <GameMap /> : null}
            {this.props.uiModules.bigmap ? <BigMap /> : null}
            {this.props.uiModules.death ? <Death /> : null}
            {this.props.uiModules.characterjob ? <CharacterJob /> : null}
        </div>
    }
}
export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules
    }
}, (dispatch) => {
    return {
        setWindowState: (windowType, windowState) => dispatch(setWindowState(windowType, windowState))
    }
})(App);