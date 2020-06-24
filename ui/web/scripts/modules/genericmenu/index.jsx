import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";

class GenericMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    render() {
        return <div id="generic-menu">
            {this.props.genericMenu.items.map((e,i) => {
                return <div className="item-menu" key={i} onClick={() => {
                    eval(e.action);
                }}>
                    {e.text}
                </div>
            })}
        </div>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        genericMenu: state.genericMenu
    }
}, (dispatch) => {
    return {
        
    }
})(GenericMenu);