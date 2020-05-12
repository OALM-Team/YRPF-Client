import * as React from "react";

export default class KeyPad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ""
        }
    }

    appendNumber(num) {
        this.setState({content: this.state.content + num})
        if(this.props.onContentChange != null) this.props.onContentChange(this.state.content + num);
    }

    removeContent() {
        if(this.state.content == "") return;
        this.setState({content: this.state.content.substr(0, this.state.content.length - 1)})
        if(this.props.onContentChange != null) this.props.onContentChange(this.state.content.substr(0, this.state.content.length - 1));
    }

    render() {
        return <div style={{textAlign: "center"}}>
            <div className="atm-button" onClick={() => this.appendNumber("1")}>
                1
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("2")}>
                2
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("3")}>
                3
            </div>
            <br />
            <div className="atm-button" onClick={() => this.appendNumber("4")}>
                4
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("5")}>
                5
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("6")}>
                6
            </div>
            <br />
            <div className="atm-button" onClick={() => this.appendNumber("7")}>
                7
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("8")}>
                8
            </div>
            <div className="atm-button" onClick={() => this.appendNumber("9")}>
                9
            </div>
            <br />
            <div className="atm-button" onClick={() => this.appendNumber("0")}>
                0
            </div>
            <div className="atm-button" onClick={() => this.removeContent()}>
                {"<"}
            </div>
        </div>
    }
}