import React from 'react';
import ReactDOM from 'react-dom';
import Errorimg from '../Images/Error.svg'

const createWindow = (window_id, widget) => {
    let div_id = "div-window-" + window_id;
    if (document.getElementById(div_id) == null) {
        var windows = document.createElement("div");
        windows.setAttribute("id", div_id);
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
            <div onClick={this.closeWindow} style={{position: "absolute", width: "300px", height: "200px", maxWidth: "50vw", maxHeight: "50vh", zIndex: 1001, backgroundColor: "#f1f2f2", left: "calc(50vw - 150px)", top: "calc(50vh - 100px)", fontFamily: "charcoalregular"}}>
                {this.props.object}
            </div>
        )
    }
}

export const metamaskAlert = (object) => {
    const x = (
        <div style={{ width: "calc(100% - 46px)", height: "calc(100% - 46px)", padding: "23px", display: "grid", gridTemplateColumns: "100px 1fr", alignSelf: "center" }}>
            <img alt="Error" src={Errorimg} style={{width: "80px", alignSelf: "center", marginLeft: "auto", marginRight :"auto"}}/>
            <div style={{alignSelf: "center"}}>{object}</div>
        </div>
    );
    createWindow("alert-No web3", <Alert object={ x }/>);
}