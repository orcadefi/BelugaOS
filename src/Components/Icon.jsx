import React from 'react';
import "../Casscade style-sheet/Components.css"
import createWindow from '../Functions/createWindow.ts'
import { windowIDs } from './Constant.jsx';
import { addWindow } from '../Functions/addWindow.jsx'

class Icon extends React.Component {

    constructor(props) {
        super(props);
        let divName = "";
        if (this.props.divName !== undefined) {
            divName = this.props.divName;
        }
        this.state = {
            id: this.props.id,
            action: this.props.action,
            src: this.props.src,
            alt: this.props.alt,
            label: this.props.label,
            top_label: this.props.top_label,
            divName: divName,
            windowZ: this.props.windowZ
        };
    }

    render() {
        return (
            <div id={"id-" + this.props.id} className={"icon-div" + this.state.divName} onClick={() => (typeof this.state.action === "function" ? this.state.action() : createWindow(this.state.action, addWindow(windowIDs[this.state.action])))}>
                <img src={this.props.src} alt={this.props.alt} className="icon-img"></img>
                <br></br>
                <label className="text icon-label">{this.props.label}</label>
            </div>
        );
    }
}

export default Icon;