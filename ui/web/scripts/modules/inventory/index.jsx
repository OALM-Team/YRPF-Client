import * as React from "react";
import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { inventory } from "../../reducers";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSelectedItem: null,
            throwQuantity: 0,
            throwWindow: false
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

    onQuantityChange(evt) {
        if(this.state.lastSelectedItem == null) return;
        if(evt.target.value <= 0) {
            this.setState({throwQuantity: 1});
            return;
        }
        if(evt.target.value > this.state.lastSelectedItem.quantity) {
            this.setState({throwQuantity: this.state.lastSelectedItem.quantity});
            return;
        }
        this.setState({throwQuantity: evt.target.value});
    }

    render() {
        return <div id="inventory">
            <UIWindow type="inventory" title={i18n.t("ui.inventory.windowName", [])} width="401px" height="100px"
                x={this.props.uiModules.uiPosition.inventory.x} 
                y={this.props.uiModules.uiPosition.inventory.y}
                onPositionUpdated={(x,y) => {
                    this.props.updateUIPosition(x,y);
                }}>
                <div className="inventory-container">
                    
                        {this.props.inventory.items.map((e, i) => {
                            return <span>
                                <ContextMenuTrigger attributes={{className: "inline"}} id="item-context">
                                    <div title={e.name} className="slot" key={i} onMouseDown={() => this.setState({lastSelectedItem: e, throwQuantity: 1})}>
                                        <img className="item-image" src={assets.items[e.itemId.toString()]} />
                                        <div className="quantity">{e.quantity}</div>
                                    </div>
                                </ContextMenuTrigger>
                            </span>
                        })}
                    
                </div>

                {this.state.throwWindow ? <UIWindow type="inventory_throw_select" title={i18n.t("ui.common.throw", [])} width="200px" height="50px"
                x={410} 
                y={0}>
                    <input type="number" style={{marginBottom: "5px"}} value={this.state.throwQuantity} onChange={this.onQuantityChange.bind(this)} />
                    <div className={"ui-btn"} onClick={() => { 
                        window.CallEvent("RemoteCallInterface", "Inventory:ThrowItem", 
                            JSON.stringify({id: this.state.lastSelectedItem.id, quantity: this.state.throwQuantity}));
                            this.setState({throwWindow: false})
                             }}>
                        {i18n.t("ui.common.throw", [])}
                    </div>
                </UIWindow> : null}
                

                <div className="weight-bar">
                    <div className="inner-bar" style={{ width: (100 * this.props.inventory.currentWeight) / this.props.inventory.maxWeight + "%"}}></div>
                    <span>{this.props.inventory.currentWeight} kg / {this.props.inventory.maxWeight} kg</span>
                </div>
            </UIWindow>
        

            <ContextMenu id="item-context">
                <MenuItem onClick={() => { window.CallEvent("RemoteCallInterface", "Inventory:UseItem", 
                        JSON.stringify({id: this.state.lastSelectedItem.id})) }}>
                    <div className="context-item">{i18n.t("ui.common.use", [])}</div>
                </MenuItem>
                <MenuItem onClick={() => this.setState({throwWindow: true})}>
                    <div className="context-item">{i18n.t("ui.common.throw", [])}</div>
                </MenuItem>
            </ContextMenu>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        inventory: state.inventory,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        resetInventory: () => dispatch({ type: constants.RESET_INVENTORY_ITEMS }),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "inventory", x, y }),
    }
})(Inventory);