import * as React from "react";
import { connect } from "react-redux";
import constants from "../actions/constants";
import { setWindowState } from "../actions/ui_modules";
import { UIWindow } from "../components";
import {
    Inventory, ATM, Garage, VSeller, CustomCharacter, VChest, GameMap, XPBar, BigMap, Death, CharacterJob,
    Seller, LangSelector, StateWindow, GrowboxMenu, VehicleState, FoodBar, Phone, HouseBuy, WelcomeScreen,
    GenericMenu, Help, CustomOutfit, TransfertInventory
} from "./";
import { ToastContainer, toast } from 'react-toastify';
import * as i18n from "../i18n";

import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handleKeyDown(evt) {

    }

    componentDidMount() {
        window.CallEvent("RemoteCallInterface", "Global:UIReady");
        i18n.syncWithLua();
        document.addEventListener("keydown", this.handleKeyDown);
        //this.props.setWindowState("inventory", true)
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        return <div>
            <ToastContainer position="bottom-right" pauseOnHover={false} pauseOnFocusLoss={false} />
            <XPBar />
            <VehicleState />
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
            {this.props.uiModules.seller ? <Seller /> : null}
            {this.props.uiModules.langSelector ? <LangSelector /> : null}
            {this.props.uiModules.statewindow ? <StateWindow /> : null}
            {this.props.uiModules.growboxmenu ? <GrowboxMenu /> : null}
            {this.props.uiModules.foodbar ? <FoodBar /> : null}
            {this.props.uiModules.phone ? <Phone /> : null}
            {this.props.uiModules.houseBuy ? <HouseBuy /> : null}
            {this.props.uiModules.welcomeScreen ? <WelcomeScreen /> : null}
            {this.props.uiModules.genericMenu ? <GenericMenu /> : null}
            {this.props.uiModules.help ? <Help /> : null}
            {this.props.uiModules.customOutfit ? <CustomOutfit /> : null}
            {this.props.uiModules.transfertInventory ? <TransfertInventory /> : null}
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
        setWindowState: (windowType, windowState) => dispatch(setWindowState(windowType, windowState))
    }
})(App);