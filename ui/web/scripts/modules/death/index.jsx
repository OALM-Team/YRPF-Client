import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";

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
        return <UIWindow type="death" title="Mort" width="300px" height="370px"
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
                <h3>Vous êtes dans le coma !</h3>
                <div>
                    Vous pouvez attendre les secours, ou attendre votre mort doucement.<br /><br />
                    Tout ce que vous avez sur vous va tomber au sol.
                </div>
            </div>
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "death", x, y })
    }
})(Death);