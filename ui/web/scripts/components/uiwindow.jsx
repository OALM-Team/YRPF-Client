import * as React from "react";
import interact from "interactjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

export default class UIWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.windowContainer = React.createRef();
        this.windowContent = React.createRef();
    }

    componentDidMount() {
        interact(this.windowContainer.current)
            .draggable({
                ignoreFrom: this.windowContent.current,
                onmove: (event) => {
                    var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                    target.style.left = x;
                    target.style.top = y;
                    target.setAttribute('data-x', x);
                    target.setAttribute('data-y', y);
                    if(this.props.onPositionUpdated != null) this.props.onPositionUpdated(x,y);
                }
            });
    }

    render() {
        return <div ref={this.windowContainer} className="uiwindow animated bounceIn fast" style={{width: this.props.width, left: this.props.x, top: this.props.y}}
            data-x={this.props.x} data-y={this.props.y}>
            <div className="header">
                {this.props.title}
                <div style={{ position: "absolute", right: "10px", top: "11px"}}>
                    <FontAwesomeIcon icon={faArrowsAlt} />
                </div>
            </div>
            <div ref={this.windowContent} className="content" style={{...this.props.contentStyle, minHeight: this.props.height}}>
                {this.props.children}
            </div>
        </div>
    }
}