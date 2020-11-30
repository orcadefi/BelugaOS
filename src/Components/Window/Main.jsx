import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "../../Casscade style-sheet/Components.css";

//Windows imports from packages
import * as Docs from './Docs.jsx';
import * as Voting from './Voting.jsx';
import * as Staking from './Staking.jsx';
import * as Lend from './Lend.jsx';
import * as Referral from './Referral.jsx';
import * as Borrow from './Borrow.jsx';
import * as Roadmap from './Roadmap.jsx';
import * as Mail from './Mail.jsx';
import * as Profile from './Profile.jsx';

//import { getGlobal, setGlobal} from '../Functions/globalContext.ts'

export let translation = {
    1: { "label": "Beluga Porject", "Window": <Docs.WindowDocs /> },
    2: { "label": "Voting", "Window": <Voting.WindowVoting /> },
    3: { "label": "Stake your BBI", "Window": <Staking.WindowStaking /> },
    4: { "label": "Lend", "Window": <Lend.WindowLend /> },
    5: { "label": "Referral Program", "Window": <Referral.WindowReferral /> },
    6: { "label": "Borrow", "Window": <Borrow.WindowBorrow /> },
    7: { "label": "Roadmap", "Window": <Roadmap.WindowRoadmap /> },
    8: { "label": "Email", "Window": <Mail.WindowMail /> },
    9: { "label": "Profile", "Window": <Profile.WindowProfile /> },
    10: { "label": "Orca", "Window": undefined },
    11: { "label": "", "Window": undefined },
    12: { "label": "Read Me", "Window": <Docs.WindowReadMe /> },
    13: { "label": "Submit Proposal", "Window": <Voting.WindowSubmitProposal /> },
    14: { "label": "Active Proposals", "Window": <Voting.WindowActiveProposals /> },
    15: { "label": "Post Proposals", "Window": <Voting.WindowHistoricalProposals /> },
    'length': 15
}


export class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget: this.props.widget,
            id: this.props.id,
            label: this.props.label,
            right_bound: window.innerWidth,
            bottom_bound: window.innerHeight,
            resize_width: 370,
            resize_height: 300,
            max_width_size: 370,
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
        for (let i = 1; i <= translation.length; i = i + 1) {
            let divToPush = document.getElementById("window-resizable-" + translation[i]['label'])
            if (divToPush !== null) {
                divs.push(divToPush)
            }
        }
        const max = divs.length + 1;
        const actualDiv = document.getElementById("window-resizable-" + this.state.label);
        let tempval = 0;
        if (actualDiv != null) {
            tempval = actualDiv.style.zIndex
        }
        const actualZindex = tempval;
        if (actualZindex !== 0) {
            for (let i = 0; i < divs.length; i = i + 1) {
                if (divs[i].style.zIndex > actualZindex && divs[i].id !== ("window-resizable-" + this.state.label)) {
                    divs[i].style.zIndex = divs[i].style.zIndex - 1;
                }
            }
            actualDiv.style.zIndex = max
        } else {
            this.setState({
                zIndex: max + 1
            })
        }
    }

    componentDidMount() {
        let thisDiv = ReactDOM.findDOMNode(this);
        thisDiv.id = ("window-resizable-" + this.state.label)
        thisDiv.style.position = "fixed"

        this.updateWindowDimensions();
        this.updateZIndex();
    }

    updateWindowDimensions() {
        let rdiv = document.getElementById("window-resizable-" + this.state.label)
        let right = window.innerWidth - parseInt(rdiv.children[0].style.width);
        let bottom = window.innerHeight - parseInt(rdiv.children[0].style.height);
        this.setState({
            right_bound: right,
            bottom_bound: bottom,
            max_width_size: window.innerWidth,
            max_height_size: window.innerHeight - 40
        })
    }

    updateWindowLimit() {
        let rdiv = document.getElementById("window-resizable-" + this.state.label)
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
                defaultPosition={{ x: 0, y: 40 }}
                cancel={".react-resizable-handle"}
                bounds={{ left: 0, top: 40, right: this.state.right_bound, bottom: this.state.bottom_bound }}
                onStart={() => this.updateWindowDimensions()}
                onStop={() => this.updateWindowLimit()}
                ref={this.draggRef}
            >
                <div>
                    <ResizableBox className="window-container" width={this.state.resize_width} height={this.state.resize_height} minConstraints={[370, 300]}
                        maxConstraints={[this.state.max_width_size, this.state.max_height_size]}
                        onClick={() => this.updateZIndex()}>
                        <div style={{width: "100%", height: "100%"}}>
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
                <div className="square" style={{ gridColumn: "4/5" }}></div>
                <div className="lines" style={{ gridColumn: "6/7" }}></div>
                <div className="text" style={{ gridColumn: "8/9", gridRow: "2/3", textAlign: "center" }}>{this.props.label}</div>
                <div className="lines" style={{ gridColumn: "10/11" }}></div>
                <div className="square" onClick={() => this.closeWindow()} style={{ cursor: "pointer", gridColumn: "12/13" }}><div style={{ width: "45%", height: "45%", borderRight: "solid black", borderBottom: "solid black", borderWidth: "2px", backgroundColor: "#E6E7E8" }}></div></div>
                <div className="lines" style={{ gridColumn: "14/15" }}></div>
                <div style={{ gridColumn: "1/16", gridRow: "4/5", borderTop: "solid black", borderWidth: "2px" }}></div>
            </div>
        )
    }
}