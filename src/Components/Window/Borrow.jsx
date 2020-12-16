import React from 'react';
import ReactDOM from 'react-dom';

import { addWindow } from '../../Functions/addWindow.jsx';
import { windowIDs } from '../Constant.jsx';
import createWindow from '../../Functions/createWindow.ts';
import Icon from '../Icon.jsx';

import ProjectHistoryimg from "../../Images/Borrow/ProjectHistory.svg";
import StartProjectimg from "../../Images/Borrow/StartProject.svg";


export class WindowBorrow extends React.Component {

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
        let BorrowData = [
            { object: StartProjectimg, label: "Start Project", id: 24, action: function commingSoon() { window.alert("Comming Soon") }, divName: "-unavailable" },
            { object: ProjectHistoryimg, label: "My Project History", id: 25, action: function commingSoon() { window.alert("Comming Soon") }, divName: "-unavailable" }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(3, 100px)" }}>
                {BorrowData.map((data) =>
                    <Icon divName={data.divName} id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)} />
                )}
            </div>
        )
    }
}
