import { connect } from "react-redux";
import { UIWindow, BlubbleProgress } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { faGlassWhiskey, faUtensils } from '@fortawesome/free-solid-svg-icons'

class FoodBar extends React.Component {

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
        return <div className="food-bar">
            <BlubbleProgress icon={faUtensils} value={this.props.foodbar.food} />
            <div style={{marginTop: "6px"}} />
            <BlubbleProgress icon={faGlassWhiskey} value={this.props.foodbar.drink} />
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n,
        foodbar: state.foodbar
    }
}, (dispatch) => {
    return {
        
    }
})(FoodBar);