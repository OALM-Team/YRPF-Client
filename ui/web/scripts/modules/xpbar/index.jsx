import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { CirclePicker } from 'react-color';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons'

class XPBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return <div className="xp-bar">
            {this.props.xpbar.items.map((e,i) => {
                return <div key={i} className="xp-bar-item animated zoomIn">
                    <FontAwesomeIcon icon={faStar} /> {e.text}
                </div>
            })}
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        xpbar: state.xpbar
    }
}, (dispatch) => {
    return {
        
    }
})(XPBar);