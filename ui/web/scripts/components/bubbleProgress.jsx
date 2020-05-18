import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class BlubbleProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        return <div className="bubble-progress">
            <div className="progress" style={{top: 100 - this.props.value + "%"}}>
                
            </div>
            <div className="icon">
                <FontAwesomeIcon icon={this.props.icon} />
            </div>
        </div>
    }
}