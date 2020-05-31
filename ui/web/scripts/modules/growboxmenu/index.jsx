import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";

class GrowboxMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItemId: ""
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        this.props.reset();
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    render() {
        let selectedItem = this.props.growboxmenu.items.find(x => x.id == this.state.selectedItemId);

        return <UIWindow type="growboxmenu" title={i18n.t("ui.growboxmenu.windowName", [])} width="400px" height="50px"
        x={this.props.uiModules.uiPosition.growboxmenu.x} 
        y={this.props.uiModules.uiPosition.growboxmenu.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
        }}
        >
            <div className="inventory-container">
                {this.props.growboxmenu.items.map((e,i) => {
                        return <div title={e.name} className={"slot " + (this.state.selectedItemId == e.id ? "slot-selected" : "")} key={i} onClick={() => {
                            this.setState({selectedItemId: e.id})
                        }}>
                            <img className="item-image" src={assets.worlditems[e.itemId.toString()]} />
                            <div className="quantity">1</div>
                        </div>
                    })}
            </div>
            <div className={"ui-btn ui-btn-error"} onClick={() => { window.CallEvent("RemoteCallInterface", "Growbox:Destroy", this.props.growboxmenu.selectedGrowboxId) }} style={{marginTop: "5px"}}>
                {i18n.t("ui.common.destroy", [])}
            </div>
            {this.state.selectedItemId != "" ? <UIWindow type="growbox-item" title={i18n.t("ui.growboxmenu_item.windowName", [])} width="200px" height="180px"
                x={410} 
                y={0}>
                    <div className="progress-bar" style={{marginTop: "5px"}}>
                        <div className="inner-bar" style={{ width: (100 * selectedItem.state) / 100 + "%", backgroundColor: "#05be3d"}}></div>
                        <span>{i18n.t("ui.growboxmenu_item.progress", [])}</span>
                    </div>

                    <div className="progress-bar" style={{marginTop: "20px"}}>
                        <div className="inner-bar" style={{ width: (100 * selectedItem.water) / 100 + "%"}}></div>
                        <span>{i18n.t("ui.growboxmenu_item.water", [])}</span>
                    </div>
                    <div className={"ui-btn"} onClick={() => { 
                        window.CallEvent("RemoteCallInterface", "Growbox:FillWaterPot", JSON.stringify({growboxId: this.props.growboxmenu.selectedGrowboxId, potId: this.state.selectedItemId}))
                    }} style={{marginTop: "5px"}}>
                        {i18n.t("ui.growboxmenu_item.fill_water", [])}
                    </div>

                    {!selectedItem.seed ? <div className={"ui-btn ui-btn-success"} onClick={() => { 
                        window.CallEvent("RemoteCallInterface", "Growbox:FillSeedPot", JSON.stringify({growboxId: this.props.growboxmenu.selectedGrowboxId, potId: this.state.selectedItemId}))
                    }} style={{marginTop: "5px"}}>
                        {i18n.t("ui.growboxmenu_item.put_seed", [])}
                    </div> : null}

                    {selectedItem.state >= 100 ? <div className={"ui-btn ui-btn-success"} onClick={() => { 
                        window.CallEvent("RemoteCallInterface", "Growbox:HarvestPot", JSON.stringify({growboxId: this.props.growboxmenu.selectedGrowboxId, potId: this.state.selectedItemId}))
                    }} style={{marginTop: "5px"}}>
                        {i18n.t("ui.growboxmenu_item.harvest", [])}
                    </div> : null}
                    

                    <div className={"ui-btn ui-btn-error"} onClick={() => { 
                        window.CallEvent("RemoteCallInterface", "Growbox:TakePot", JSON.stringify({growboxId: this.props.growboxmenu.selectedGrowboxId, potId: this.state.selectedItemId}))
                    }} style={{marginTop: "20px"}}>
                        {i18n.t("ui.growboxmenu_item.take", [])}
                    </div>
                </UIWindow> : null}
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        growboxmenu: state.growboxmenu,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        reset: (x,y) =>  dispatch({ type: constants.RESET_GROWBOXMENU }),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "growboxmenu", x, y })
    }
})(GrowboxMenu);