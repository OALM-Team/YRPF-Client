import { connect } from "react-redux";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { } from '@fortawesome/free-solid-svg-icons'
import Homepage from "./screens/homepage";
import Call from "./screens/call";
import Message from "./screens/message";
import MessageList from "./screens/message-list";
import Contacts from "./screens/contacts";
import AddContacts from "./screens/addContact";
import ItemShop from "./screens/item-shop";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
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
        return <div>
            <TransitionGroup>
                <CSSTransition
                    key={this.props.phone.currentScreen}
                    classNames="appanim"
                    timeout={300}
                >
                    {(() => {
                        switch (this.props.phone.currentScreen) {
                            case "homepage":
                                return <Homepage />;
                            case "contacts":
                                return <Contacts />;
                            case "call":
                                return <Call />;
                            case "message":
                                return <Message />;
                            case "message-list":
                                return <MessageList />;
                            case "addContact":
                                return <AddContacts />;
                            case "item-shop":
                                return <ItemShop />;
                            default: return null;
                        }
                    })()}
                </CSSTransition>
            </TransitionGroup>
            <div className="navigation-bar">
                <div className="nav-bt" onClick={() => this.props.setPhoneScreen("homepage")}>
                    <FontAwesomeIcon icon={faCircle} />
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
        setPhoneScreen: (screen) => dispatch({ type: constants.SET_PHONE_SCREEN, currentScreen: screen }),
    }
})(PhoneNavigation);