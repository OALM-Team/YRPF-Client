import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class LangSelector extends React.Component {

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
        return <UIWindow type="langSelector" title={i18n.t("ui.langSelector.windowName", [])} width="300px" height="150px"
        x={this.props.uiModules.uiPosition.langSelector.x} 
        y={this.props.uiModules.uiPosition.langSelector.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
        }}
        >
           
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
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "langSelector", x, y })
    }
})(LangSelector);