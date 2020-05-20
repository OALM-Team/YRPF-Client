import { connect } from "react-redux";
import { UIWindow, BlubbleProgress } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { } from '@fortawesome/free-solid-svg-icons'
import Homepage from "./screens/homepage";
import Call from "./screens/call";
import Message from "./screens/message";
import Contacts from "./screens/contacts";
import Gamemap from "./screens/gamemap";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import { faCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PhoneNavigation extends React.Component {

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
        return <Switch>
                <Route path="*">
                    <TransitionGroup>
                        <CSSTransition
                            key={this.props.location.pathname}
                            classNames="appanim"
                            timeout={300}
                        >
                            <Switch location={this.props.location}>
                                <Route exact path="/" component={Homepage} />
                                <Route path="/call" component={Call} />
                                <Route path="/contacts" component={Contacts} />
                                <Route path="/message/*" component={Message} />
                                <Route path="/gamemap" component={Gamemap} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                    <div className="navigation-bar">
                        <Link to="/">
                            <div className="nav-bt">
                                <FontAwesomeIcon icon={faCircle} />
                            </div>
                        </Link>
                    </div>
                </Route>
            </Switch>
    }
}

export default withRouter(connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {

    }
})(PhoneNavigation));