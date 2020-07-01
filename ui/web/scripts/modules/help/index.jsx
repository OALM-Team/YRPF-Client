import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class Help extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keys: [
                {action: "Utiliser", keybinding: "E"},
                {action: "Inventaire", keybinding: "I"},
                {action: "Métiers", keybinding: "J"},
                {action: "Emotes", keybinding: "G"},
                {action: "Carte", keybinding: "M"},
                {action: "Tourner un objet (Housing)", keybinding: "O"},
                {action: "Téléphone", keybinding: "F1"},
                {action: "Cacher/Montrer l'interface", keybinding: "F10"},
                {action: "Intéraction joueur", keybinding: "CTRL+I"},
                {action: "Verrouiller/Dévérrouiller les portes", keybinding: "CTRL+L"},
                {action: "Modifier Housing", keybinding: "CTRL+E"},
                {action: "Modifier la caméra", keybinding: "CTRL+V"},
                {action: "Menu maison", keybinding: "CTRL+H"}
            ]
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div id="help-page" className="animated fadeIn">
            {this.state.keys.map((e,i) => {
                return <div className="help-item" key={i}>
                    <div className="action-name">{e.action}</div>
                    <div className="keybinding">{e.keybinding}</div>
                </div>
            })}
        </div>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {
    }
})(Help);