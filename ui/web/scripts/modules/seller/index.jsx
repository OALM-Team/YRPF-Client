import { connect } from "react-redux";
import { UIWindow } from "../../components";
import assets from "../../assets";
import * as React from "react";
import constants from "../../actions/constants";
import { CirclePicker } from 'react-color';
import itemStrings from "../../strings/items";

class Seller extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buyList: [
                //{id: 1, name: "Pomme", quantity: 1},
            ]
        }
        console.log(props);
    }

    componentDidMount() {
        window.CallEvent("SetInputMode", 1)
    }

    componentWillUnmount() {
        window.CallEvent("SetInputMode", 0)
    }

    addItemToCard(item) {
        if(this.state.buyList.find(x => x.id == item.id) != null) {
            this.state.buyList.find(x => x.id == item.id).quantity++;
            this.forceUpdate();
        } else {
            this.setState({buyList: [...this.state.buyList, {id: item.id, name: item.name, quantity: 1, price: item.price}]})
        }
    }

    removeItemFromCart(item) {
        this.state.buyList.find(x => x.id == item.id).quantity--;
        if(this.state.buyList.find(x => x.id == item.id).quantity <= 0) {
            let toRemoteItem = this.state.buyList.find(x => x.id == item.id);
            this.state.buyList.splice(this.state.buyList.indexOf(toRemoteItem), 1);
        }
        this.forceUpdate();
    }

    getTotalPrice() {
        let price = 0;
        for(let item of this.state.buyList) {
            price += item.quantity * item.price;
        }
        return price;
    }

    submitCart() {

    }

    render() {
        return <UIWindow type="seller" title="Vendeur" width="600px" height="50px"
            x={this.props.uiModules.uiPosition.seller.x} 
            y={this.props.uiModules.uiPosition.seller.y}
            onPositionUpdated={(x,y) => {
                this.props.updateUIPosition(x,y);
            }}
            >
                <div className="seller-container">
                    <div className="shop-list inventory-container">
                        {this.state.buyList.map((e,i) => {
                            return <div title={e.name} className="slot" key={i} onClick={() => {
                                this.removeItemFromCart(e);
                            }}>
                                <img className="item-image" src={assets.items[e.id.toString()]} />
                                <div className="quantity">{e.quantity}</div>
                            </div>
                        })}
                        <div className={"ui-btn " + (this.getTotalPrice() == 0 ? "ui-btn-disabled" : "")} style={{position: "absolute", bottom: "5px", right: "5px", left: "5px"}}>
                            {this.getTotalPrice() < 0 ? "Vendre" : "Acheter"} ({this.getTotalPrice()}$)
                        </div>
                    </div>
                    <div className="sell-list">
                        {this.props.seller.items.map((e,i) => {
                            return <div className={"sell-item"} key={i} onClick={() => {
                                this.addItemToCard(e);
                            }}>
                                <img className="sell-item-img" src={assets.items[e.id.toString()]} />
                                <div className="sell-item-content">
                                    {e.name}
                                    <div className="desc">
                                        {itemStrings.descriptions[e.id.toString()]}
                                    </div>
                                </div>
                                <div className={"price " + (e.price < 0 ? "price-minus" : "")}>
                                    {e.price < 0 ? -(e.price) : e.price}$
                                </div>
                            </div>
                        })}
                    </div>
                </div>
        </UIWindow>
    }
}

export default connect((state, ownProps) => {
    return {
        uiModules: state.uiModules,
        seller: state.seller
    }
}, (dispatch) => {
    return {
        updateUIPosition: (x,y) =>  dispatch({ type: constants.UPDATE_UI_POSITION, windowType: "seller", x, y })
    }
})(Seller);