import { connect } from "react-redux";
import { UIWindow, BlubbleProgress } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import * as i18n from "../../i18n";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { faGasPump, faLightbulb } from '@fortawesome/free-solid-svg-icons'

class VehicleState extends React.Component {

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
        if(!this.props.vehiclestate.visible) return null;
        return <div className="vehicle-state">
            <div className="container">
                <div style={{marginRight: "15px", display: "inline-block"}}>
                    <BlubbleProgress icon={faLightbulb} value={this.props.vehiclestate.lightState ? 100 : 0} />
                </div>
                <div className="speed-counter">
                    <div style={{ width: 95, height: 95, display: "inline-block" }}>
                        <CircularProgressbar value={this.props.vehiclestate.currentMph} text={this.props.vehiclestate.currentMph}
                            maxValue={this.props.vehiclestate.maxMph}
                            styles={
                                buildStyles({
                                    rotation: -0.25,
                                    strokeLinecap: 'butt',
                                    textSize: '30px',
                                    pathTransitionDuration: 0.5,
                                    pathColor: `rgba(0, 255, 0, ${this.props.vehiclestate.currentMph / 100})`,
                                    textColor: 'white',
                                    trailColor: 'rgba(128, 128, 128, 0.300)'
                            })
                        } />
                    </div>
                </div>
                <div style={{marginLeft: "60px", display: "inline-block"}}>
                    <BlubbleProgress icon={faGasPump} value={this.props.vehiclestate.fuel} />
                </div>
            </div>
        </div>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        vehiclestate: state.vehiclestate,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        
    }
})(VehicleState);