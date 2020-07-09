import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons'

class TransfertInventory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.props.resetInventory();
        window.CallEvent("RemoteCallInterface", "Inventory:RequestContent", JSON.stringify({type: "main"}))
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    render() {
        return <UIWindow type="transfertInventory" title={i18n.t("ui.inventory.windowName", [])} width="300px" height="150px"
        x={this.props.uiModules.uiPosition.transfertInventory.x} 
        y={this.props.uiModules.uiPosition.transfertInventory.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
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

            <UIWindow type="transfertInventory_chest" title={i18n.t("ui.chest.windowName", [])} width="300px" height="150px"
            x={305} 
            y={0}>
                <div className="inventory-container">
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
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        inventory: state.inventory
    }
}, (dispatch) => {
    return {
        resetInventory: () => dispatch({ type: constants.RESET_INVENTORY_ITEMS }),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "transfertInventory", x, y })
    }
})(TransfertInventory);