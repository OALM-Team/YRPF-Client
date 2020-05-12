import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { CirclePicker } from 'react-color';
import jobStrings from "../../strings/job";

class CharacterJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        this.props.resetCharacterJobs();
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    render() {
        return <UIWindow type="characterjob" title="Métiers" width="400px" height="50px"
            x={this.props.uiModules.uiPosition.characterjob.x} 
            y={this.props.uiModules.uiPosition.characterjob.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
                {this.props.characterjob.items.map((e,i) => {
                    return <div key={i} className="characterjob-item">
                        <div className="job-icon">
                            <img src={assets.job["icon_" + e.jobId.toLowerCase()]} />
                        </div>
                        <div style={{paddingLeft: "10px"}}>
                            <b>{e.levelName}</b>
                            <div className="desc">
                                {jobStrings.descriptions[e.jobId.toLowerCase()]}
                            </div>
                            <div className="progress-bar" style={{marginTop: "5px"}}>
                                <div className="inner-bar" style={{ width: "100%"}}></div>
                                <span>{e.xp} XP</span>
                            </div>
                        </div>
                    </div>
                })}
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        characterjob: state.characterjob
    }
}, (dispatch) => {
    return {
        resetCharacterJobs: () => dispatch({type: constants.RESET_CHARACTERJOB}),
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "characterjob", x, y })
    }
})(CharacterJob);