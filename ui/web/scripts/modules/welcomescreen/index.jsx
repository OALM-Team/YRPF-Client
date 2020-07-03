import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class WelcomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        window.CallEvent("PlayAndRegister2DSound", "welcome_music", "sounds/music_1.mp3", 0.2);
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
        window.CallEvent("Stop2DSound", "welcome_music");
    }

    render() {
        return <div id="welcomescreen">
            <div className="welcome-img">
            </div>
            <div className="button-area">
                <div className="ui-btn" style={{width: "250px", marginLeft: "auto", marginRight: "auto"}} onClick={() => this.props.disableScreen()}>
                    Rejoindre le serveur
                </div>
            </div>
            <div className="ribbon">
                <div className="block">
                    <h2>Description</h2>
                    <span>
                        Bienvenue sur le serveur <b>OALM RP</b><br />
                        Faites de vos envies une réalité ! Rejoignez notre discord pour lire les règles, c'est <b>OBLIGATOIRE</b><br />
                        Bon jeu à tous sur <b>OALM</b>
                    </span>
                </div>
                <div className="block block-center-text">
                    <h2>Bienvenue sur OALM</h2>
                    <span>Amusez-vous en respectant les régles</span>
                </div>
                <div className="block">
                    <h2>Informations</h2>
                    <span>
                        Gamemode <b>Roleplay</b><br />
                        Joueurs Max <b>200</b><br />
                        Discord <b>https://discord.gg/vpMEGSz</b><br />
                        Credits <b>JanHolger, Vugi</b><br />
                    </span>
                </div>
            </div>
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
        disableScreen: () =>  dispatch({ type: constants.SET_WINDOW_STATE, windowType: "welcomeScreen", windowState: false })
    }
})(WelcomeScreen);