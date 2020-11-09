import React from 'react';
import "../Casscade style-sheet/Components.css"

class Icon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            function: this.props.function,
            src: this.props.src,
            alt: this.props.alt,
            label: this.props.label
        };
        this.createWindow = this.createWindow.bind(this)
    }

    createWindow() {
        let NewDivName = "div-id-" + this.state.id;
        if (document.getElementById(NewDivName) != null) {
            console.log("out")
        } else {
            console.log("in");
            var windows = document.createElement("div");
            windows.setAttribute("id", NewDivName)
            var homeDiv = document.getElementById('topbar');
            document.body.insertBefore(windows, homeDiv)
        }
    }

    render() {
        return (
            <div id={"id-" + this.props.id} class="icon-div" onClick={() => this.createWindow()}>
                <img src={this.props.src} alt={this.props.alt} class="icon-img"></img>
                <br></br>
                <label  class="text icon-label">{this.props.label}</label>
            </div>
        );
    }
}

export default Icon;