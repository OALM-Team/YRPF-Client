import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class StateWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        return <div className="state-window">
            <div className="item animated zoomIn">
                {i18n.t("ui.statewindow.placement_validate", [])}
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
        
    }
})(StateWindow);