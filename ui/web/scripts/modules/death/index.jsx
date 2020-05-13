import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class Death extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    render() {
        return <UIWindow type="death" title={i18n.t("ui.death.windowName", [])} width="300px" height="370px"
        x={this.props.uiModules.uiPosition.death.x} 
        y={this.props.uiModules.uiPosition.death.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
        }}
        >
            <div style={{color: "white", textAlign: "center"}}>

                <div style={{textAlign: "center", marginTop: "20px"}}>
                    <img src={require("../../../assets/death_icon.png")} style={{width: "150px"}} />
                </div>
                <h3>{i18n.t("ui.death.sentence1", [])}</h3>
                <div>
                    {i18n.t("ui.death.sentence2", [])}<br /><br />
                    {i18n.t("ui.death.sentence3", [])}
                </div>
            </div>
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "death", x, y })
    }
})(Death);