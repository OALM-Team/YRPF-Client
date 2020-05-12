import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { CirclePicker } from 'react-color';

class VSeller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedVehicleId: -1,
            selectedColor: "#000000"
        }
    }

    componentDidMount() {
        this.props.resetVehicles();
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    requestBuyVehicle() {
        if(this.state.selectedVehicleId == -1) return;
        window.CallEvent("RemoteCallInterface", "Garage:BuyVehicle",
            JSON.stringify({modelId: this.state.selectedVehicleId, color: this.state.selectedColor}));
    }

    render() {
        return <UIWindow type="vseller" title="Vendeur de véhicules" width="450px" height="50px"
            x={this.props.uiModules.uiPosition.vseller.x} 
            y={this.props.uiModules.uiPosition.vseller.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
            <div className="vseller">
                {this.state.selectedVehicleId == -1 ? <div>
                    {this.props.vseller.vehicles.map((e,i) => {
                        return <div className="vseller-item" key={i}>
                            <div className="v-image-container">
                                <img className="v-image" src={assets.vehicles[e.modelId.toString()]} />
                                <div className="buy-btn">
                                    <div className="ui-btn-small ui-btn-success" onClick={() => {
                                        this.setState({selectedVehicleId: e.modelId})
                                    }}>
                                        Acheter ({e.price}$)
                                    </div>
                                </div>
                            </div>
                            <div className="v-content">
                                <div className="name">{e.name}</div>
                                <div className="desc">
                                    {e.description}
                                </div>
                            </div>
                        </div>
                    })}
                </div> : null}
                
                {this.state.selectedVehicleId != -1 ? <div>
                    <div style={{marginLeft: "85px"}}>
                        <CirclePicker onChangeComplete={(color) => {
                            this.setState({selectedColor: color.hex })
                        }} />
                    </div>
                    <br />
                    <div style={{ backgroundColor: this.state.selectedColor }} className={"ui-btn"}
                        onClick={() => { this.requestBuyVehicle() }}>
                        Acheter le véhicule
                    </div>
                </div> : null}
            </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        vseller: state.vseller
    }
}, (dispatch) => {
    return {
        resetVehicles: () => dispatch({type: constants.RESET_VSELLER_VEHICLE}),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "vseller", x, y }),
    }
})(VSeller);