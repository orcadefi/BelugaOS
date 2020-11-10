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
    render() {
        return (
            <div className="home" id="home">
                <TopBar id="topbar" imgcurrency={currency.img} alt={currency.label} currency={currency.label}/>
                <div className="images-div">
                    {images.map((data) =>
                        <Icon divName="-home" key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id}/>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;