import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "../../Casscade style-sheet/Components.css";

import { windowIDs } from '../Constant.jsx';

export class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget: this.props.widget,
            id: this.props.id,
            label: this.props.label,
            right_bound: window.innerWidth,
            bottom_bound: window.innerHeight,
            resize_width: (this.props.sizeW !==  undefined ? this.props.sizeW : 420),
            resize_height: (this.props.sizeH !==  undefined ? this.props.sizeH : 300),
            max_width_size: 420,
            max_height_size: 300,
            zIndex: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateWindowLimit = this.updateWindowLimit.bind(this);
        this.updateZIndex = this.updateZIndex.bind(this)
        this.draggRef = React.createRef()
    }

    updateZIndex() {
        let divs = []
        let size = Object.keys(windowIDs).length;
        for (let i = 1; i <= size; i = i + 1) {
            let divToPush = document.getElementById("window-resizable-" + i)
            if (divToPush !== null) {
                divs.push(divToPush)
            }
        }
        const max = divs.length + 2;
        const actualDiv = document.getElementById("window-resizable-" + this.state.id);
        let tempval = 0;
        if (actualDiv == null) {
            return;
        } else {
            tempval = actualDiv.style.zIndex
        }
        const actualZindex = tempval;
        if (actualZindex > (divs.length + 2)) {
            actualDiv.style.zIndex = max
        }
        if (actualZindex < (divs.length + 2)) {
            for (let i = 0; i < divs.length; i = i + 1) {
                if (divs[i].style.zIndex > actualZindex && divs[i].id !== ("window-resizable-" + this.state.id)) {
                    divs[i].style.zIndex = divs[i].style.zIndex - 1;
                }
            }
            actualDiv.style.zIndex = max
        }
        if (actualZindex === (divs.length + 2)) {
            for (let i = 0; i < divs.length; i = i + 1) {
                if (divs[i].style.zIndex === actualZindex && divs[i].id !== ("window-resizable-" + this.state.id)) {
                    divs[i].style.zIndex = divs[i].style.zIndex - 1;
                }
            }
        }
    }

    componentDidMount() {
        let thisDiv = ReactDOM.findDOMNode(this);
        thisDiv.id = ("window-resizable-" + this.state.id)
        thisDiv.style.position = "fixed"

        let divs = []
        let size = Object.keys(windowIDs).length;
        for (let i = 1; i <= size; i = i + 1) {
            let divToPush = document.getElementById("window-resizable-" + i)
            if (divToPush !== null) {
                divs.push(divToPush)
            }
        }
        thisDiv.style.zIndex = divs.length + 2;
        this.updateWindowDimensions();
        this.updateWindowLimit();
    }

    updateWindowDimensions() {
        let rdiv = ReactDOM.findDOMNode(this);
        let right = window.innerWidth - parseInt(rdiv.children[0].style.width);
        let bottom = window.innerHeight - parseInt(rdiv.children[0].style.height);
        this.setState({
            right_bound: right,
            bottom_bound: bottom,
            max_width_size: window.innerWidth,
            max_height_size: window.innerHeight - 40
        })
        this.updateZIndex();
    }

    updateWindowLimit() {
        let rdiv = ReactDOM.findDOMNode(this);
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
        this.setState({
            max_width_size: window.innerWidth - x,
            max_height_size: window.innerHeight - y
        })
    }

    setZIndex(z) {
        if (z > 2 && z < 200) {
            this.setState({
                zIndex: z
            })
        }
    }

    getZIndex() {
        return this.state.zIndex
    }

    render() {
        return (
            <Draggable
                handle=".window-topbar"
                defaultPosition={{ x: (this.props.x !==  undefined ? this.props.x : 0), y: (this.props.y !==  undefined ? this.props.y : 40) }}
                cancel={".react-resizable-handle"}
                bounds={{ left: 0, top: 40, right: this.state.right_bound, bottom: this.state.bottom_bound }}
                onStart={() => this.updateWindowDimensions()}
                onStop={() => this.updateWindowLimit()}
                ref={this.draggRef}
            >
                <div>
                    <ResizableBox className="window-container" width={this.state.resize_width} height={this.state.resize_height} minConstraints={[420, 300]}
                        maxConstraints={[this.state.max_width_size, this.state.max_height_size]}
                    >
                        <div style={{ width: "100%", height: "100%" }} onClick={() => this.updateZIndex()}>
                            <WindowTopBar label={this.props.label} />
                            <div id={"window-content-" + this.state.label} className="window-content">
                                {this.state.widget}
                            </div>
                        </div>
                    </ResizableBox>
                </div>    
            </Draggable >
        );
    }
}

class WindowTopBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
        this.closeWindow = this.closeWindow.bind(this);
    }

    closeWindow() {
        let thisDiv = ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode.parentNode;
        thisDiv.parentNode.removeChild(thisDiv)
    }

    render() {
        return (
            <div className="window-topbar">
                <div className="lines" style={{ gridColumn: "2/3" }}></div>
                <div className="square" onClick={() => this.closeWindow()} style={{ cursor: "pointer", gridColumn: "4/5" }}></div>
                <div className="lines" style={{ gridColumn: "6/7" }}></div>
                <div className="text" style={{ gridColumn: "8/9", gridRow: "2/3", textAlign: "center" }}>{this.props.label}</div>
                <div className="lines" style={{ gridColumn: "10/11" }}></div>
                <div className="square" style={{ gridColumn: "12/13" }}><div style={{ width: "45%", height: "45%", borderRight: "solid black", borderBottom: "solid black", borderWidth: "2px", backgroundColor: "#E6E7E8" }}></div></div>
                <div className="lines" style={{ gridColumn: "14/15" }}></div>
                <div style={{ gridColumn: "1/16", gridRow: "4/5", borderTop: "solid black", borderWidth: "2px" }}></div>
            </div>
        )
    }
}