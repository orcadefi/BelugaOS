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

import Submitimg from "../Images/Voting/Submit.svg"
import Activeimg from "../Images/Voting/Active.svg"
import Historicalimg from "../Images/Voting/Historical.svg"

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

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nisi eros, ullamcorper a vestibulum at, fringilla quis neque. Mauris id metus ac tortor dapibus consectetur ac eu lectus. Sed at tortor eu nulla pellentesque egestas. Donec pellentesque at nulla et hendrerit. Curabitur sit amet urna eget elit pharetra varius. Nam viverra enim et libero pellentesque bibendum."


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
            { object: Submitimg, label: "Submit Proposal", id: 13 },
            { object: Activeimg, label: "Active Proposals", id: 14 },
            { object: Historicalimg, label: "Historical Propoals", id: 15 }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(auto, 100px)" }}>
                {DocsData.map((data) =>
                    <Icon divName="-window" function={data.func} key={data.id} src={data.object} alt={data.label} label={data.label} id={data.id} top_label={data.label} />
                )}
            </div>
        )
    }
}

class WindowStaking extends React.Component {
    render() {
        let stakinContainer = [{ data: "45,625", label: "BBI Staked" }, { data: "30%", label: "APR" }, { data: "7d 24h 60m 60s", label: "Next Payout" }]
        let stakingTable = [{a: "32416898", b: "2,65", c: ""}, {a: "32416897", b: "2,65", c: ""}, {a: "32416896", b: "2,65", c: ""}, {a: "32416895", b: "2,65", c: ""}]
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{top: "23px", position: "relative", display: "grid", gridTemplateColumns: "150px 190px 120px 70px", gridTemplateRows: "1fr", height: "20px" , width: "calc(100% - 46px)", left: "23px"}}>
                    <label className="text" style={{fontSize: "17px", textAlign: "center"}}>Stacking Address</label>
                    <div></div>
                    <label className="text" style={{fontSize: "12px", textAlign: "center", paddingTop: "5%"}}>Current Staking</label>
                    <label className="text" style={{fontSize: "20px"}}>30 BBI</label>
                </div>
                <div style={{top: "40px", position: "relative", display: "grid", gridTemplateColumns: "460px 70px", gridTemplateRows: "1fr", height: "20px", width: "calc(100% - 46px)", left: "23px" }}>
                    <input className="text container"></input>
                    <button className= "text activeButton">Copy</button>
                </div>
                <div style={{ top: "60px", position: "relative", display: "grid", gridTemplateColumns: "160px 160px 160px", gridColumnGap: "25px", gridTemplateRows: "1fr", height: "70px", width: "calc(100% - 46px)", left: "23px" }}>
                    {stakinContainer.map((data) =>
                        <div className="text stakingContainer">
                            <label className="text" style={{alignItems: "center", display: "flex", justifyContent: "center", fontSize: "18px"}}>{data.data}</label>
                            <label className="text" style={{alignItems: "center", display: "flex", justifyContent: "center", fontSize: "14px"}}>{data.label}</label>
                        </div>
                    )}
                </div>
                <table className="text BBITable" style={{}}>
                    <thead>
                        <tr>
                            <th>BBI Staking Payouts</th>
                            <th>BBI Earned</th>
                            <th>BBI Staked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stakingTable.map((data) =>
                            <tr>
                                <td>{data.a}</td>
                                <td>{data.b}</td>
                                <td>{data.c}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
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
                <img src={this.props.image} style={{ width: "100%" }} alt={this.props.top}/>
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


class WindowSubmitProposal extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{position: "relative", top: "23px", left: "23px", display: "grid", gridTemplateColumns: "100px 100px", gridColumnGap: "50px", gridTemplateRows: "20px 35px", width: "calc(100% - 46px)"}}>
                    <label className="text">Name</label>
                    <label className="text">Expires In</label>
                    <input className="text container" placeholder="Name Here"></input>
                    <input className="text container" placeholder="000"></input>
                </div>
                <div style={{position: "relative", top: "46px", left: "23px", width: "calc(100% - 50px)"}}>
                    <label className="text">Description</label>
                    <input className="text container" placeholder="Type description here" style={{width: "calc(100% - 4px)", height: "160px"}}></input>
                </div>
                <button className="text activeButton" style={{position: "relative", top: "70px", left: "23px"}}>Submit</button>
            </div>
        )
    }
}


class WindowActiveProposals extends React.Component {

    singleProposal(id, title, expires, text) {
        return (
            <div style={{width: "100%", height: "140px", borderBottom: "solid black 2px"}}>
                <div style={{ position: "relative", top: "7px", left: "23px", width: "calc(100% - 46px)" }}>
                    <label className="text" style={{display: "block", textAlign: "end", fontSize: "11px"}}>Expires in</label>
                </div>
                <div style={{ position: "relative", top: "7px", left: "23px", width: "calc(100% - 46px)", display: "grid", gridTemplateColumns: "1fr 110px", gridColumnGap: "10px" }}>
                    <label className="text textOverflow" style={{ fontSize: "22px" }}>{title}</label>
                    <div className="text" style={{ backgroundColor: "white", border: "solid black 2px", height: "50%", top: "10%", position: "relative", fontSize: "10px", textAlign: "center"}}>{expires}</div>
                </div>
                <div style={{ position: "relative", left: "23px", width: "calc(100% - 46px)", height: "45px" , overflow: "hidden", fontSize: "11px"}}>
                    <p className="text">{text}</p>
                </div>
                <div style={{ position: "relative", left: "23px", width: "calc(100% - 46px)", height: "25px", fontSize: "12px", display: "grid", gridTemplateColumns: "1fr 75px 50px", gridTemplateRows: "1fr", gridGap: "10px", top: "5px" }}>
                    <div></div>
                    <button className="text againstButton">AGAINST</button>
                    <button className="text forButton">FOR</button>
                </div>
            </div>
        )
    }

    render() {
        let proposals = [
            {
                id: 0,
                title: "Focus on Mobile App",
                expires: "3d 12h 3m 26s",
                text: loremIpsum
            },
            {
                id: 1,
                title: "Burn Tokens",
                expires: "3d 12h 3m 26s",
                text: loremIpsum
            },
            {
                id: 2,
                title: "Translate App to Russian",
                expires: "3d 12h 3m 26s",
                text: loremIpsum
            }
        ]
        return (
            <div style={{width: "100%", height: "100%"}}>
                {proposals.map((data) =>
                    this.singleProposal(data.id, data.title, data.expires, data.text)
                )}
            </div>
        )
    }
}

class WindowHistoricalProposals extends React.Component {
    render() {
        let HistoricalProposals = [
            {
                id: 0,
                title: "Chande Color Scheme",
                vote: false,
                time: "2 days",
                text: loremIpsum,                
            },
            {
                id: 1,
                title: "Launch Mobile App",
                vote: true,
                time: "25 days",
                text: loremIpsum,                
            },
            {
                id: 2,
                title: "Burn Tokens",
                vote: false,
                time: "30 days",
                text: loremIpsum,                
            }
        ]
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{ width: "100%", height: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr", backgroundColor: "white", borderBottom: "solid black 2px" }}>
                    <div style={{borderRight: "solid black 1px"}}>

                    </div>
                    <div style={{borderLeft: "solid black 1px"}}>

                    </div>
                </div>
                <div style={{ width: "100%", height: "12px", backgroundColor: "#bcbec0", borderBottom: "solid black 2px" }}></div>
                {HistoricalProposals.map((data) =>
                    <PostProposalReview id={data.id} title={data.title} vote={data.vote} time={data.time} text={data.text} />
                )}
            </div>
        )
    }
}

class PostProposalReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            title: this.props.title,
            vote: this.props.vote,
            time: this.props.time,
            text: this.props.text,
            compact: this.props.compact
        }
    }

    render() {
        return (
            <div style={{width: "100%", height: "150px", borderBottom: "solid black 2px"}}>
                <div style={{ position: "relative", width: "calc(100% - 46px)", height: "33px", top: "23px", left: "23px", display: "grid", gridTemplateColumns: "1fr 50px", gridTemplateRows: "1fr", gridGap: "15px" }}>
                    <label className="text textOverflow" style={{fontSize: "22px"}}>{this.state.title}</label>
                    <label className="text" style={{fontSize: "12px"}}>{this.state.time}</label>
                </div>
                <div style={{ position: "relative", width: "calc(50% - 23px)", top: "23px", left: "23px" , backgroundColor: (this.state.vote ? "#b4f263" : "#f27548" ), textAlign: "center", fontSize: "10px", border: "solid black 2px"}}>
                    <label className="text">{this.state.vote ? "Community voted FOR" : "Community voted AGAINST"}</label>
                </div>
                <div style={{ position: "relative", left: "23px", width: "calc(100% - 46px)", height: "45px" , overflow: "hidden", fontSize: "11px", top: "23px"}}>
                    <p className="text">{this.state.text}</p>
                </div>
                <div style={{position: "relative", width: "100%", height: "25px", bottom: "0px", borderTop: "solid black 2px", backgroundColor: "white", top: "27px"}}></div>
            </div>
        );
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
    13: { "label": "Submit Proposal", "Window": <WindowSubmitProposal /> },
    14: { "label": "Active Proposals", "Window": <WindowActiveProposals /> },
    15: { "label": "Post Proposals", "Window": <WindowHistoricalProposals /> },
    'length': 15
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

        ReactDOM.render(translation[this.state.id]['Window'], document.getElementById("window-content-" + this.state.label));
        this.updateWindowDimensions();
        this.updateZIndex();
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
                            <div id={"window-content-" + this.state.label} className="window-content"></div>
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