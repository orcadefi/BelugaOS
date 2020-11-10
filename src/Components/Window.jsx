import React from 'react';
import ReactDOM from 'react-dom'
import Draggable from 'react-draggable';
import "../Casscade style-sheet/Components.css";

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
    { object: Profileimg, label: "Profile", id: 9 }
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
            { object: GitHubimg, label: "Github", id: 1 , func: this.githubFunction},
            { object: ReadMeimg, label: "Read Me", id: 2 }
        ]
        return (
            <div className="window-grid">
                {DocsData.map((data) =>
                    <Icon divName="-window" function={data.func} key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id}/>
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
                <p className="text heading2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec mauris ullamcorper, convallis sapien ut, eleifend elit. Vestibulum dignissim elementum leo in tincidunt. Suspendisse viverra cursus feugiat. Sed sagittis pretium ipsum. Ut commodo porta purus sit amet lobortis. Ut euismod, mauris in rutrum fringilla, enim sem molestie mauris, iaculis rhoncus quam nibh id ex. Sed auctor est nisi, sed condimentum ligula aliquam at. </p>
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
    "Read Me": <WindowReadMe />
}

export default class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label
        };
    }

    componentDidMount() {
        ReactDOM.render(translation[(this.state.label)], document.getElementById("window-content-" + this.state.label));
    }

    render() {
        return (
            <Draggable
                handle=".window-topbar"
                defaultPosition={{ x: 50, y: 50, z: 4 }}>
                <div>
                    <div className="window-container">
                        <WindowTopBar label={this.props.label} />
                        <div id={"window-content-" + this.state.label} className="window-content"></div>
                    </div>
                </div>
            </Draggable>
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
                <div className="square" onClick={() => this.closeWindow()} style={{cursor: "pointer", gridColumn: "12/13" }}><div style={{ width: "45%", height: "45%", borderRight: "solid black", borderBottom: "solid black", borderWidth: "2px", backgroundColor: "#E6E7E8" }}></div></div>
                <div className="lines" style={{ gridColumn: "14/15" }}></div>
                <div style={{ gridColumn: "1/16", gridRow: "4/5", borderTop: "solid black", borderWidth: "2px" }}></div>
            </div>
        )
    }
}