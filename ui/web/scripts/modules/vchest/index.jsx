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
        this.props.resetInventory();
        window.CallEvent("RemoteCallInterface", "Inventory:RequestContent", JSON.stringify({type: "main"}))
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    requestWearItem(uuid) {
        window.CallEvent("RemoteCallInterface", "Character:RequestWearFromVehicleChest", uuid)
    }

    render() {
        return <UIWindow type="vchest" title={i18n.t("ui.inventory.windowName", [])} width="300px" height="150px"
            x={this.props.uiModules.uiPosition.vchest.x}
            y={this.props.uiModules.uiPosition.vchest.y}
            onPositionUpdated={(x, y) => {
                this.props.updateUIPosition(x, y);
            }}
        >
            <div className="inventory-container">
                {this.props.inventory.items.map((e, i) => {
                    return <span>
                        <div title={e.name} className="slot" key={i} onMouseDown={() => { 
                            window.CallEvent("RemoteCallInterface", "Chest:TransfertToChest", e.id)
                         }}>
                            <img className="item-image" src={assets.items[e.itemId.toString()]} />
                            <div className="quantity">{e.quantity}</div>
                        </div>
                    </span>
                })}
            </div>
            <UIWindow type="vchest" title={i18n.t("ui.vchest.windowName", [])} width="400px" height="150px"
                x={310}
                y={0}
                onPositionUpdated={(x, y) => {}}
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
                    {this.props.inventory.chestItems.map((e, i) => {
                        return <span>
                            <div title={e.name} className="slot" key={i} onMouseDown={() => {
                                window.CallEvent("RemoteCallInterface", "Chest:TransfertToInventory", e.id)
                            }}>
                                <img className="item-image" src={assets.items[e.itemId.toString()]} />
                                <div className="quantity">{e.quantity}</div>
                            </div>
                        </span>
                    })}
                </div>
                <div className="weight-bar">
                    <div className="inner-bar" style={{ width: (100 * this.props.inventory.chestCurrentWeight) / this.props.inventory.chestMaxWeight + "%"}}></div>
                    <span>{this.props.inventory.chestCurrentWeight} kg / {this.props.inventory.chestMaxWeight} kg</span>
                </div>
            </UIWindow>
            <div className="weight-bar">
                <div className="inner-bar" style={{ width: (100 * this.props.inventory.currentWeight) / this.props.inventory.maxWeight + "%"}}></div>
                <span>{this.props.inventory.currentWeight} kg / {this.props.inventory.maxWeight} kg</span>
            </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        vchest: state.vchest,
        inventory: state.inventory,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        resetInventory: () => dispatch({ type: constants.RESET_INVENTORY_ITEMS }),
        resetChest: () => dispatch({ type: constants.RESET_VCHEST }),
        updateUIPosition: (x, y) => dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "vchest", x, y }),
    }
})(VChest);