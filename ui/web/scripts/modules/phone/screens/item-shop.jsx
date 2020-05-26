import { connect } from "react-redux";
import assets from "../../../assets";
import * as React from "react";
import constants from "../../../actions/constants";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ItemShop extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: require("../../../../../../../../yrpf/itemshop.json")
        }
    }

    componentDidMount() {
        window.CallEvent("RemoteCallInterface", "Phone:RequestContacts");
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            <div className="app-bar app-icon-blue">
                Amozon
            </div>
            <div className="app-container item-shop-screen">
                <div className="item-shop-list-container">
                    {this.state.items.sort((a,b) => a.price - b.price).map((e, i) => {
                        return <div key={i} className="item-shop-item">
                            <img src={process.env.NODE_ENV == "development" ? "https://dev.playonset.com/images/objects-static/" + e.modelId + ".jpg" : "http://game/objects/" + e.modelId} />
                            <div className="price">
                                {e.price}$
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        phone: state.phone
    }
}, (dispatch) => {
    return {
        setPhoneScreen: (screen, params) => dispatch({ type: constants.SET_PHONE_SCREEN, currentScreen: screen, params: params })
    }
})(ItemShop);