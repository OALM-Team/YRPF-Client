import * as React from "react";
import * as i18n from "../i18n";

export default class ArrowSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }

    next() {
        if(this.state.index + 1 > this.props.options.length - 1) {
            this.setState({index: 0})
            if(this.props.onChange != null) 
                this.props.onChange(this.props.options[0].value)
        } else {
            this.setState({index: this.state.index + 1})
            if(this.props.onChange != null) 
                this.props.onChange(this.props.options[this.state.index + 1].value)
        }
    }

    previous() {
        if(this.state.index - 1 < 0) {
            this.setState({index: this.props.options.length - 1})
            if(this.props.onChange != null) 
                this.props.onChange(this.props.options[this.props.options.length - 1].value)
        } else {
            this.setState({index: this.state.index - 1})
            if(this.props.onChange != null) 
                this.props.onChange(this.props.options[this.state.index - 1].value)
        }

    }

    render() {
        return <div className="arrow-selector">
            <div className="arrow-selector-header">{this.props.name}</div>
            <div className="arrow-selector-arrow" onClick={this.previous.bind(this)}>{"<"}</div>
            <div className="arrow-selector-text">
                {i18n.t("ui.options." + this.props.options[this.state.index].name.split(' ').join("_"), [])}
            </div>
            <div className="arrow-selector-arrow" onClick={this.next.bind(this)}>{">"}</div>
        </div>
    }
}