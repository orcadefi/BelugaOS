import React from 'react';
import ReactDOM from 'react-dom'
import "../Casscade style-sheet/Components.css"
import Window from './Window'

class Icon extends React.Component {

    constructor(props) {
        super(props);
        let divName = "";
        if (this.props.divName !== undefined) {
            divName = this.props.divName;
        }
        this.state = {
            id: this.props.id,
            function: this.props.function,
            src: this.props.src,
            alt: this.props.alt,
            label: this.props.label,
            divName: divName
        };
        this.createWindow = this.createWindow.bind(this)
    }

    createWindow() {
        if (this.state.function !== undefined) {
            this.state.function()
        } else {
            let NewDivName = "div-icon-created-" + this.state.label;
            if (document.getElementById(NewDivName) == null) {
                var windows = document.createElement("div");
                windows.setAttribute("id", NewDivName)
                var homeDiv = document.getElementById('topbar');
                document.body.insertBefore(windows, homeDiv)
                ReactDOM.render(
                      <Window label={this.state.label}/>,
                    document.getElementById(NewDivName)
                  );
            }            
        }

    }

    render() {
        return (
            <div id={"id-" + this.props.id} className={"icon-div" + this.state.divName} onClick={() => this.createWindow()}>
                <img src={this.props.src} alt={this.props.alt} className="icon-img"></img>
                <br></br>
                <label  className="text icon-label">{this.props.label}</label>
            </div>
        );
    }
}

export default Icon;