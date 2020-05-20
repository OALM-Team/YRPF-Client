import { connect } from "react-redux";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import {
    BrowserRouter as Router,
} from "react-router-dom";
import PhoneNavigation from "./phoneNavigation";

class Phone extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return <div id="phone" className="animated slideInUp">
            <div id="phone-background"></div>
            <div id="phone-anchor"></div>
            <div id="status-bar"></div>
            <div id="screen">
                <Router>
                    <PhoneNavigation />
                    
                </Router>
            </div>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {

    }
})(Phone);