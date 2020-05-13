import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { Map, ImageOverlay, Marker, Polygon } from 'react-leaflet'
import { CRS, Icon, DivIcon } from "leaflet";
import * as i18n from "../../i18n";


class BigMap extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icons: this.setupIcons(),
            zoom: 0,
            position: [this.worldToMapImgY(this.props.map.characterPosition.y), this.worldToMapImgX(this.props.map.characterPosition.x)],
            playerIcon: new DivIcon({
                iconUrl: assets.gamemap.playerCursor,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
                shadowSize: [0, 0],
                className: '',
                html: '<img id="player-cursor" src="' + assets.gamemap.playerCursor + '" width="20" />',
                
            })
        }
    }

    setupIcons() {
        let icons = {};
        for(let i in assets.gamemap) {
            icons[i] = new Icon({
                iconUrl: assets.gamemap[i],
                iconSize: [30, 30],
                iconAnchor: [15, 15],
                shadowSize: [0, 0]
            })
        }
        return icons;
    }

    componentDidUpdate() {
        document.querySelector("#player-cursor").style.transform = "rotate(" + (this.props.map.heading + 90) + "deg)";
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    worldToMapImgX(worldX) {
        return (worldX + 234002.2054794521) / 241.041095890411;
    }

    worldToMapImgY(worldY) {
        return 1943 - (worldY + 231101.3928571428) / 242.5535714285714;
    }

    mapImgToWorldX(mapDivX) {
        return 241.041095890411 * mapDivX - 234002.2054794521;
    }

    mapImgToWorldY(mapDivY) {
        return 242.5535714285714 * (1943 - mapDivY) - 231101.3928571428;
    }

    render() {
        return <UIWindow type="customCharacter" title={i18n.t("ui.bigmap.windowName", [])} width="550px" height="350px"
        x={this.props.uiModules.uiPosition.bigmap.x} 
        y={this.props.uiModules.uiPosition.bigmap.y}
        onPositionUpdated={(x,y) => {
            this.props.updateUIPosition(x,y);
        }}
        >
            <div style={{overflow: "hidden"}}>
                <Map className="map-canvas-big" 
                    onViewportChange={(e) => {
                        this.setState({position: e.center, zoom: e.zoom})
                    }}
                    center={this.state.position}
                    zoom={this.state.zoom} minZoom={-10} crs={CRS.Simple} zoomControl={false} zoomAnimation={true}>
                    <ImageOverlay url={assets.gamemap.map} bounds={[[0,0], [1943,2000]]} />

                    <Marker style={{transform: "rotate(" + (this.props.map.heading + 90) + "deg)"}} 
                        position={[this.worldToMapImgY(this.props.map.characterPosition.y), this.worldToMapImgX(this.props.map.characterPosition.x)]}
                        icon={this.state.playerIcon} />

                    {this.props.map.markers.map((e, i) => {
                        return <Marker key={i} position={[this.worldToMapImgY(e.position[0]), this.worldToMapImgX(e.position[1])]}
                            icon={this.state.icons[e.icon]} />
                    })}
                    

                    {this.props.map.zones.map((e, i) => {
                        return <Polygon key={i} positions={e.points.map(z => {
                            return [this.worldToMapImgY(z[0]), this.worldToMapImgX(z[1])]
                        })} fillColor={e.color} color={e.color} />
                    })}
                </Map>
            </div>
        </UIWindow>;
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        map: state.map,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "bigmap", x, y })
    }
})(BigMap);