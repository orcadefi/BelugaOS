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
import Metamask from "./Metamask"

import GitHubimg from "../Images/Docs/GitHub.svg";
import ReadMeimg from "../Images/Docs/ReadMe.svg";

import RefLinkimg from "../Images/Referral/RefLink.svg"
import InvYourFriendsimg from "../Images/Referral/InvYourFriends.svg"
import Cryptoimg from "../Images/Referral/Crypto.svg"

export let images = [
    { object: Docsimg, label: "Docs", id: 1, top_label: "Beluga Porject" },
    { object: Votingimg, label: "Voting", id: 2, top_label: "Voting" },
    { object: Stakingimg, label: "Staking", id: 3, top_label: "Stake your BBI" },
    { object: Lendimg, label: "Lend", id: 4, top_label: "Lend" },
    { object: Referralimg, label: "Referral", id: 5, top_label: "Referral Program" },
    { object: Borrowimg, label: "Borrow", id: 6, top_label: "Borrow" },
    { object: Roadmapimg, label: "Roadmap", id: 7, top_label: "Roadmap" },
    { object: Mailimg, label: "Mail", id: 8, top_label: "Email" },
    { object: Profileimg, label: "Profile", id: 9, top_label: "Profile" },
    {
        object: Orcaimg, label: "Orca", id: 10, top_label: "Orca", function: function orcaFunction() {
            window.open('http://orcadefi.com/', '_blank');
        }
    }
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
            { object: GitHubimg, label: "Github", id: 11, func: this.githubFunction },
            { object: ReadMeimg, label: "Read Me", id: 12 }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(2, 100px)" }}>
                {DocsData.map((data) =>
                    <Icon divName="-window" function={data.func} key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id} top_label={data.label} />
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
        let imgs = [
            { image: RefLinkimg, top: '1.Get referral link', data: 'Register and get your unique referral link and code', prop: 'Referral Link' },
            { image: InvYourFriendsimg, top: '2.Invite Your Friends', data: 'Invite your friends to register via your link or code', prop: 'Invite Your Friends' },
            { image: Cryptoimg, top: '3.Earn Crypto Together', data: 'You will receive up to $2,000 USD when your friends stake BBI on Beluga Exchange', prop: 'Earn Crypto' }
        ]
        return (
            <div style={{ position: "relative", height: "calc(100% - 23px)", width: "calc(100% - 23px)", top: "23px", left: "23px" }}>
                <p className="text" style={{ fontSize: "20px", marginBlockEnd: "0px", marginBlockStart: "0px", }}>Referral Program</p>
                <p className="text heading3" style={{ marginBlockStart: "0px" }}>Invite Friends, and earn fee</p>
                <div className="referral-grid">
                    <div className="text stats"></div>
                    <div className="text stats"></div>
                    <div className="text stats"></div>
                </div>
                <p className="text heading3">How it Works</p>
                <div className="referral-grid-2">
                    {imgs.map((data) =>
                        <RefInstructions image={data.image} top={data.top} data={data.data}/>
                    )}
                </div>
                <p className="text heading3">Bonus Calculation</p>
                <p className="heading3 text no-space" style={{ fontSize: "8px", width: "385px" }}>You can earn up to $2,000 USD in free BBI for every friend you refer, depending on your friend's first successful BBI staking amount, and on condition that they passed KYC advanced</p>

            </div>
        )
    }
}

class RefInstructions extends React.Component {
    render() {
        return (
            <div className="text ref-works">
                            <img src={this.props.image} style={{ width: "100%" }} />
                            <div className="vertical-grid">
                                <p className="heading3 text no-space" style={{fontSize: "10px"}}>{this.props.top}</p>
                                <p className="heading3 text no-space" style={{ fontSize: "8px" }}>{this.props.data}</p>
                            </div>
                        </div>
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
            <div>
                <p>
                    Metamask
                </p>
                <Metamask />
            </div>
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
    1: { "label": "Beluga Porject", "Window": <WindowDocs /> },
    2: { "label": "Voting", "Window": <WindowVoting /> },
    3: { "label": "Stake your BBI", "Window": <WindowStaking /> },
    4: { "label": "Lend", "Window": <WindowLend /> },
    5: { "label": "Referral Program", "Window": <WindowReferral /> },
    6: { "label": "Borrow", "Window": <WindowBorrow /> },
    7: { "label": "Roadmap", "Window": <WindowRoadmap /> },
    8: { "label": "Email", "Window": <WindowMail /> },
    9: { "label": "Profile", "Window": <WindowProfile /> },
    10: { "label": "Orca", "Window": <WindowOrca /> },
    11: { "label": "", "Window": undefined },
    12: { "label": "Read Me", "Window": <WindowReadMe /> },
    'length': 12
}


export default class Window extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            label: this.props.label,
            id: this.props.id,
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
        //let names = Object.keys(translation)
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
        ReactDOM.render(translation[this.state.id]['Window'], document.getElementById("window-content-" + this.state.label));
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
                <ResizableBox className="window-container" width={this.state.resize_width} height={this.state.resize_height} minConstraints={[370, 300]}
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