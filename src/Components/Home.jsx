import React from 'react';
import "../Casscade style-sheet/Components.css"
import Icon from "./Icon"
import TopBar from "./TopBar"
import EtherIcon from "../Images/EtherIcon.svg"
import { images } from "./Window"

let currency = {
    img: EtherIcon,
    label: "ETH"
}

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            windowZ: {}
        }
    }

    render() {
        return (
            <div className="home" id="home">
                <TopBar id="topbar" imgcurrency={currency.img} alt={currency.label} currency={currency.label}/>
                <div className="images-div">
                    {images.map((data) =>
                        <Icon windowZ={this.state.windowZ} divName="-home" key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id} top_label={data.top_label} function={data.function}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;