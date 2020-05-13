import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";

class VChest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItem: ""
        }
    }

    componentDidMount() {
        this.props.resetChest();
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    requestWearItem(uuid) {
        window.CallEvent("RemoteCallInterface", "Character:RequestWearFromVehicleChest", uuid)
    }

    render() {
        return <UIWindow type="vchest" title={i18n.t("ui.vchest.windowName", [])} width="450px" height="50px"
            x={this.props.uiModules.uiPosition.vchest.x} 
            y={this.props.uiModules.uiPosition.vchest.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
            <div className="inventory-container">
                    {this.props.vchest.items.map((e, i) => {
                        return <span key={i}>
                            <div className="slot" onMouseDown={() => this.requestWearItem(e.uuid)}>
                                <img className="item-image" src={assets.worlditems[e.modelId.toString()]} />
                                <div className="quantity">1</div>
                            </div>
                        </span>
                    })}
                
            </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        vchest: state.vchest,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        resetChest: () => dispatch({type: constants.RESET_VCHEST}),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "vchest", x, y }),
    }
})(VChest);