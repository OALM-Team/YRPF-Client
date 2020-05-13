import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";

class Garage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedVehicleUUID: ""
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    requestVehicle() {
        if(this.state.selectedVehicleUUID == "") return;
        window.CallEvent("RemoteCallInterface", "Garage:RequestVehicle", this.state.selectedVehicleUUID);
    }

    render() {
        return <UIWindow type="garage" title={i18n.t("ui.garage.windowName", [])} width="450px" height="50px"
            x={this.props.uiModules.uiPosition.garage.x} 
            y={this.props.uiModules.uiPosition.garage.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
                <div className="garage">
                    <div className="garage-vehicles-container">
                        {this.props.garage.vehicles.map((e,i) => {
                            return <div className={"vehicle-slot " + (this.state.selectedVehicleUUID == e.uuid ? "vehicle-slot-selected" : "")} key={i} onClick={() => {
                                this.setState({selectedVehicleUUID: e.uuid})
                            }}>
                                <img className="v-image" src={assets.vehicles[e.modelId.toString()] ? assets.vehicles[e.modelId.toString()] : assets.vehicles["-1"]} />
                                <div className="v-plate">{e.plate}</div>
                                <div className="v-color" style={{backgroundColor: e.color}}></div>
                            </div>
                        })}
                    </div>
                    <div className={"ui-btn " + (this.state.selectedVehicleUUID == "" ? "ui-btn-disabled" : "")}
                        onClick={() => { this.requestVehicle() }}>
                        {i18n.t("ui.garage.requestVehicle", [])}
                    </div>
                </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        garage: state.garage,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "garage", x, y }),
    }
})(Garage);