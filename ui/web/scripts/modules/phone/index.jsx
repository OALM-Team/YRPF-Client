import { connect } from "react-redux";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import PhoneNavigation from "./phoneNavigation";
import { BlubbleProgress } from "../../components";
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class Phone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
        window.CallEvent("RemoteCallInterface", "Phone:RequestAttachPhone", "true");
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0);
        if(this.props.phone.inCallState == -1) window.CallEvent("RemoteCallInterface", "Phone:RequestAttachPhone", "false");
    }

    render() {
        return <div id="phone" className="animated slideInUp">
            <div onClick={() => { window.CallEvent("RequestToogleUI", "phone") }} style={{position: "absolute", top: "-50px", right: "0px", cursor: "pointer", zIndex: "100", pointerEvents: "all"}}>
                <BlubbleProgress icon={faTimes} value={0} />
            </div>
            <div id="phone-background"></div>
            <div id="phone-anchor"></div>
            <div id="status-bar">
            </div>
            <div id="screen">
                <PhoneNavigation />
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

    }
})(Phone);