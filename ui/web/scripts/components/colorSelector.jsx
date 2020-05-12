import * as React from "react";
import { CirclePicker } from 'react-color';

export default class ColorSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false
        }
    }

    onChange(color) {
        if(this.props.onChange != null) 
            this.props.onChange(color.hex)
    }

    render() {
        return <div className="arrow-selector">
            <div className="arrow-selector-header">{this.props.name}</div>
            <div className="arrow-selector-text" style={{verticalAlign:"middle", textAlign: "center", paddingLeft: "18px"}}>
                <CirclePicker colors={["#000000", "#828282", "#e3e3e3", "#f5ce58", "#ff6f00", "#00ff51"]}
                    onChangeComplete={this.onChange.bind(this)} />
            </div>
        </div>
    }
}