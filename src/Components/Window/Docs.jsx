import React from 'react';
import ReactDOM from 'react-dom';
import Icon from '../Icon.jsx';

import { addWindow } from '../../Functions/addWindow.jsx'
import { windowIDs } from '../Constant.jsx';
import createWindow from '../../Functions/createWindow.ts';

import GitHubimg from "../../Images/Docs/GitHub.svg";
import ReadMeimg from "../../Images/Docs/ReadMe.svg";

export class WindowDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
    }

    changeWindow = (action) => {
        let ldiv = ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode;
        let rdiv = ldiv.parentNode;
        let style_data = window.getComputedStyle(rdiv);
        let matrix = style_data.transform || style_data.webkitTransform || style_data.mozTransform
        let matrixType = matrix.includes('3d') ? '3d' : '2d'
        let matrixValues = matrix.match(/matrix.*\((.+)\)/)[1].split(', ')
        let x, y = 0
        if (matrixType === '2d') {
            x = matrixValues[4]
            y = matrixValues[5]
        }
        if (matrixType === '3d') {
            x = matrixValues[12]
            y = matrixValues[13]
        }

        try {
            x = parseInt(x, 10);
        } catch ( error ) { }
        try {
            y = parseInt(y, 10);
        } catch (error) { }
        let w;
        let h;
        try {
            w = parseInt(ldiv.style.width, 10);
        } catch ( error ) { }
        try {
            h = parseInt(ldiv.style.height, 10);
        } catch (error) { }
        let windowToCreate = addWindow(windowIDs[action], w, h, x, y);
        createWindow(action, windowToCreate)
        let thisDiv = ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode.parentNode.parentNode;
        thisDiv.parentNode.removeChild(thisDiv)
    }

    render() {
        let DocsData = [
            
            { object: GitHubimg, label: "Github", id: 11, action: function orca() { window.open('https://github.com/orcadefi/BelugaOS', '_blank') }},
            { object: ReadMeimg, label: "Read Me", id: 12, action: 2}
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(2, 100px)" }}>
                {DocsData.map((data) =>
                    <Icon divName="-window" id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)}/>
                )}
            </div>
        )
    }
}

export class WindowReadMe extends React.Component {
    render() {
        return (
            <div className="window">
                <label className="text heading1"> Read Me</label>
                <br />
                <p className="text heading2" style={{ textAlign: "justify", textJustify: "inter-word" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mauris ullamcorper, convallis sapien ut, eleifend elit. Vestibulum dignissim elementum leo in tincidunt. Suspendisse viverra cursus feugiat. Sed sagittis pretium ipsum. Ut commodo porta purus sit amet lobortis. Ut euismod, mauris in rutrum fringilla, enim sem molestie mauris, iaculis rhoncus quam nibh id ex. Sed auctor est nisi, sed condimentum ligula aliquam at. </p>
            </div>
        )
    }
}