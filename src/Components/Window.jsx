import React from 'react';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import "../Casscade style-sheet/Components.css";
import Iframe from 'react-iframe'

import Icon from './Icon';

import Borrowimg from "../Images/Borrow.svg";
import Docsimg from "../Images/Docs.svg";
import Lendimg from "../Images/Lend.svg";
import Mailimg from "../Images/Mail.svg";
import Profileimg from "../Images/Profile.svg";
import Roadmapimg from "../Images/Roadmap.svg";
import Referralimg from "../Images/Referral.svg";
import Stakingimg from "../Images/Staking.svg";
import Votingimg from "../Images/Voting.svg";
import Orcaimg from "../Images/Orca.svg"

import GitHubimg from "../Images/Docs/GitHub.svg";
import ReadMeimg from "../Images/Docs/ReadMe.svg";

export let images = [
    { object: Docsimg, label: "Docs", id: 1 },
    { object: Votingimg, label: "Voting", id: 2 },
    { object: Stakingimg, label: "Staking", id: 3 },
    { object: Lendimg, label: "Lend", id: 4 },
    { object: Referralimg, label: "Referral", id: 5 },
    { object: Borrowimg, label: "Borrow", id: 6 },
    { object: Roadmapimg, label: "Roadmap", id: 7 },
    { object: Mailimg, label: "Mail", id: 8 },
    { object: Profileimg, label: "Profile", id: 9 },
    { object: Orcaimg, label: "Orca", id: 10 }
]

class WindowDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
        this.githubFunction = this.githubFunction.bind(this);
    }

    githubFunction() {
        window.open('https://github.com/orcadefi/BelugaOS', '_blank');
    }

    render() {
        let DocsData = [
            { object: GitHubimg, label: "Github", id: 1, func: this.githubFunction },
            { object: ReadMeimg, label: "Read Me", id: 2 }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(2, 100px)" }}>
                {DocsData.map((data) =>
                    <Icon divName="-window" function={data.func} key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id} />
                )}
            </div>
        )
    }
}

class WindowVoting extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowStaking extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowLend extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowReferral extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowBorrow extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowRoadmap extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowMail extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowProfile extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

class WindowReadMe extends React.Component {
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

class WindowOrca extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div style={{ width: "100%", height: "100%" }}>
                <Iframe url="http://orcadefi.com/"
                    width="100%"
                    height="100%"
                    id="orcaFrame"
                    className="orcaFrame"
                    position="relative" />
            </div>
        )
    }
}

export let translation = {
    "Docs": <WindowDocs />,
    "Voting": <WindowVoting />,
    "Staking": <WindowStaking />,
    "Lend": <WindowLend />,
    "Referral": <WindowReferral />,
    "Borrow": <WindowBorrow />,
    "RoadMap": <WindowRoadmap />,
    "Mail": <WindowMail />,
    "Profile": <WindowProfile />,
    "Read Me": <WindowReadMe />,
    "Orca": <WindowOrca />
}

export default class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            right_bound: window.innerWidth,
            bottom_bound: window.innerHeight,
            resize_width: 250,
            resize_height: 190,
            max_width_size: 250,
            max_height_size: 190,
            zIndex: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.updateWindowLimit = this.updateWindowLimit.bind(this);
        this.updateZIndex = this.updateZIndex.bind(this)
        this.draggRef = React.createRef()
    }

    updateZIndex() {
        let names = Object.keys(translation)
        let divs = []
        for (let i = 0; i < names.length; i = i + 1) {
            let divToPush = document.getElementById("window-resizable-" + names[i])
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
        ReactDOM.render(translation[(this.state.label)], document.getElementById("window-content-" + this.state.label));
        this.updateWindowDimensions();
    }

    componentWillMount() {
        this.updateZIndex()
    }

    updateWindowDimensions() {
        let rdiv = document.getElementById("window-resizable-" + this.state.label)
        let right = window.innerWidth - parseInt(rdiv.style.width);
        let bottom = window.innerHeight - parseInt(rdiv.style.height);
        this.setState({
            right_bound: right,
            bottom_bound: bottom,
            max_width_size: window.innerWidth,
            max_height_size: window.innerHeight - 40
        })
        this.updateZIndex()
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
                defaultPosition={{ x: 0, y: 40, z: 4 }}
                cancel={".react-resizable-handle"}
                bounds={{ left: 0, top: 40, right: this.state.right_bound, bottom: this.state.bottom_bound }}
                onStart={() => this.updateWindowDimensions()}
                onStop={() => this.updateWindowLimit()}
            >
                <ResizableBox className="window-container" width={this.state.resize_width} height={this.state.resize_height} minConstraints={[250, 190]}
                    maxConstraints={[this.state.max_width_size, this.state.max_height_size]}
                    id={"window-resizable-" + this.state.label}
                    ref={this.draggRef} style={{ zIndex: this.state.zIndex }}
                    onClick={() => this.updateZIndex()}>
                    <WindowTopBar label={this.props.label} />
                    <div id={"window-content-" + this.state.label} className="window-content"></div>
                </ResizableBox>
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
        let ThisDiv = document.getElementById("div-icon-created-" + this.state.label);
        ThisDiv.parentNode.removeChild(ThisDiv)

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