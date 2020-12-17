import React from 'react';
import ReactDOM from 'react-dom';
import Errorimg from '../Images/Error.svg';
import Metamaskimg from '../Images/Metamask.svg';

import '../Casscade style-sheet/AlertWindow.css'

const createWindow = (window_id, widget) => {
    let div_id = "div-window-" + window_id;
    if (document.getElementById(div_id) == null) {
        var windows = document.createElement("div");
        windows.setAttribute("id", div_id);
        windows.setAttribute("class", "div-window-error")
        var homeDiv = document.getElementById('topbar');
        document.body.insertBefore(windows, homeDiv);
        ReactDOM.render(
            widget ,
            document.getElementById(div_id)
        );
    }
}


class Alert extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
        this.closeWindow = this.closeWindow.bind(this);
    }

    closeWindow = () => {
        let thisDiv = ReactDOM.findDOMNode(this).parentNode;
        thisDiv.parentNode.removeChild(thisDiv)
    }

    render() {
        return (
            <div className="alert-class" onClick={this.closeWindow} >
                <label className="close-X">X</label>
                {this.props.object}
            </div>
        )
    }
}

export const metamaskAlert = (object) => {
    const x = (
        <div className="metamask-alert">
            <img alt="Metamask error" src={Metamaskimg} style={{width: "80px", alignSelf: "center", marginLeft: "auto", marginRight :"auto"}}/>
            <div style={{alignSelf: "center"}}>{object}</div>
        </div>
    );
    createWindow("alert-Metamask", <Alert object={ x }/>);
}