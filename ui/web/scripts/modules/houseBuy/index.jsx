import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from '@fortawesome/free-solid-svg-icons'

class HouseBuy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        window.CallEvent("Play2DSound", "sounds/shop_bell.mp3", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    handleBuyClick() {
        window.CallEvent("RemoteCallInterface", "House:RequestBuy");
    }

    render() {
        return <UIWindow type="houseBuy" title={i18n.t("ui.houseBuy.windowName", [])} width="300px" height="150px"
        x={this.props.uiModules.uiPosition.houseBuy.x} 
        y={this.props.uiModules.uiPosition.houseBuy.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
        }}
        >
            <div style={{color: "white", textAlign: "center", fontSize: "80px", marginTop: "20px"}}>
                <FontAwesomeIcon icon={faHome} />
            </div>
            <div style={{color: "white", textAlign: "center", fontSize: "25px", marginTop: "15px"}}>
                {this.props.house.houseName}
            </div>
            <div className="ui-btn" style={{marginTop: "15px"}} onClick={this.handleBuyClick.bind(this)}>
                Acheter cette propriété pour {this.props.house.housePrice}$
            </div>
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        house: state.house
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "houseBuy", x, y })
    }
})(HouseBuy);