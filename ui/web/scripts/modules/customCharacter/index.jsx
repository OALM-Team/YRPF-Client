import { connect } from "react-redux";
import { UIWindow, ArrowSelector, ColorSelector } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import options from "./options";
import * as i18n from "../../i18n";

class CustomCharacter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            gender: "male",
            body: options.bodies[0].value,
            hair: options.hairs[0].value,
            hairColor: "#000000",
            top: options.top[0].value,
            pant: options.pants[0].value,
            shoes: options.shoes[0].value
        };
    }

    reset() {
        this.onBodyChange(this.state.body);
        this.onHairChange(this.state.hair);
        this.onTopChange(this.state.top);
        this.onPantChange(this.state.pant);
        this.onShoesChange(this.state.shoes);
    }

    requestSave() {
        if(this.state.name.length < 4) {
            return false;
        }
        if(this.state.name.indexOf(" ") == -1) {
            return false;
        }
        
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "name", value: this.state.name}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "gender", value: this.state.gender}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "body", value: this.state.body}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "hair", value: this.state.hair}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "hair_color", value: this.state.hairColor}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "top", value: this.state.top}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "pant", value: this.state.pant}));
        window.CallEvent("RemoteCallInterface", "Character:Style:SavePart", JSON.stringify({partType: "shoes", value: this.state.shoes}));
        window.CallEvent("RemoteCallInterface", "Character:Style:CustomDone");
    }

    componentDidUpdate() {
        window.CallEvent("SetInputMode", 2)
    }

    componentDidMount() {
        this.reset();
        window.CallEvent("SetInputMode", 2)
        window.CallEvent("SetLocalPlayerRotation", 0, 0, 0)
        
        this.setCameraLocation(70, 75);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    componentWillUnmount() {
        window.CallEvent("SetLocalPlayerRotation", 0, -90, 0)
        window.CallEvent("ResetCamera")
        window.CallEvent("SetInputMode", 0)
    }

    setCameraLocation(x,y,z) {
        window.CallEvent("SetCameraAPI", x, y, z)
    }

    onGenderChange(value) {
        this.setState({
            gender: value,
            body: options.bodies.filter(x => x.gender == value)[0].value,
            hair: options.hairs.filter(x => x.gender == value)[0].value,
            top: options.top.filter(x => x.gender == value)[0].value,
            pant: options.pants.filter(x => x.gender == value)[0].value,
            shoes: options.shoes.filter(x => x.gender == value)[0].value
        })
        CallEvent("Character:SetBodyMesh", -1, options.bodies.filter(x => x.gender == value)[0].value);
        CallEvent("Character:SetHairMesh", -1, options.hairs.filter(x => x.gender == value)[0].value);
        CallEvent("Character:SetTopMesh", -1, options.top.filter(x => x.gender == value)[0].value);
        CallEvent("Character:SetPantMesh", -1, options.pants.filter(x => x.gender == value)[0].value);
        CallEvent("Character:SetShoesMesh", -1, options.shoes.filter(x => x.gender == value)[0].value);
    }

    onBodyChange(value) {
        this.setState({body: value})
        CallEvent("Character:SetBodyMesh", -1, value)

        this.setCameraLocation(70, 75);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    onHairChange(value) {
        this.setState({hair: value})
        CallEvent("Character:SetHairMesh", -1, value)
        this.onHairColorChange(this.state.hairColor);
        
        this.setCameraLocation(70, 75);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    onHairColorChange(value) {
        this.setState({hairColor: value})
        CallEvent("Character:SetHairColor", -1, value.substring(1))
        
        this.setCameraLocation(70, 75);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    onTopChange(value) {
        this.setState({top: value})
        CallEvent("Character:SetTopMesh", -1, value)
        
        this.setCameraLocation(160, 50);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    onPantChange(value) {
        this.setState({pant: value})
        CallEvent("Character:SetPantMesh", -1, value)
        
        this.setCameraLocation(160, -25);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    onShoesChange(value) {
        this.setState({shoes: value})
        CallEvent("Character:SetShoesMesh", -1, value)

        this.setCameraLocation(120, -65);
        window.CallEvent("SetLocalPlayerRotation", 0, 180, 0)
    }

    isValidForm() {
        if(this.state.name.length < 4) {
            return false;
        }
        if(this.state.name.indexOf(" ") == -1) {
            return false;
        }
        return true;
    }

    render() {
        return <UIWindow type="customCharacter" title={i18n.t("ui.characterCustom.windowName", [])} width="450px" height="50px"
            x={this.props.uiModules.uiPosition.customCharacter.x} 
            y={this.props.uiModules.uiPosition.customCharacter.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
            <div className="arrow-selector">
                <div className="arrow-selector-header">{i18n.t("ui.characterCustom.name", [])}</div>
                <div className="arrow-selector-text" style={{verticalAlign:"middle", textAlign: "center", paddingLeft: "18px"}}>
                    <input type="text" value={this.state.name} onChange={(evt) => {
                        if(!/^[a-zA-Z ]+$/.test(evt.target.value)) return;
                        if(evt.target.value.length > 20) return;
                        this.setState({name: evt.target.value})
                    }} />
                </div>
            </div>
            <ArrowSelector name={i18n.t("ui.characterCustom.gender", [])} options={options.gender}
                onChange={this.onGenderChange.bind(this)} />
            <ArrowSelector name={i18n.t("ui.characterCustom.body", [])} 
                options={options.bodies.filter(x => x.gender == this.state.gender)}
                onChange={this.onBodyChange.bind(this)} />
            <ArrowSelector name={i18n.t("ui.characterCustom.hair", [])}
                options={options.hairs.filter(x => x.gender == this.state.gender)}
                onChange={this.onHairChange.bind(this)} />
            <ColorSelector name={i18n.t("ui.characterCustom.hair_color", [])} onChange={this.onHairColorChange.bind(this)} />
            <ArrowSelector name={i18n.t("ui.characterCustom.top", [])} 
                options={options.top.filter(x => x.gender == this.state.gender)}
                onChange={this.onTopChange.bind(this)} />
            <ArrowSelector name={i18n.t("ui.characterCustom.pant", [])}
                options={options.pants.filter(x => x.gender == this.state.gender)}
                onChange={this.onPantChange.bind(this)} />
            <ArrowSelector name={i18n.t("ui.characterCustom.shoes", [])}
                options={options.shoes.filter(x => x.gender == this.state.gender)}
                onChange={this.onShoesChange.bind(this)} />

            <div className={"ui-btn " + (!this.isValidForm() ? "ui-btn-disabled" : "")}
                onClick={() => { this.requestSave() }}>
                {i18n.t("ui.common.validate", [])}
            </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        _: state.i18n
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "customCharacter", x, y }),
    }
})(CustomCharacter);