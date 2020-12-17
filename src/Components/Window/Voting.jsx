import React from 'react'
import Icon from '../Icon'
import ReactDOM from 'react-dom';

import { addWindow } from '../../Functions/addWindow.jsx'
import { windowIDs } from '../Constant.jsx';
import createWindow from '../../Functions/createWindow.ts';

import Submitimg from "../../Images/Voting/Submit.svg"
import Activeimg from "../../Images/Voting/Active.svg"
import Historicalimg from "../../Images/Voting/Historical.svg"
import Filterimg from "../../Images/Voting/Filter.svg"
import Sortimg from "../../Images/Voting/Sort.svg"
import Upimg from "../../Images/Voting/Up.svg"
import Downimg from "../../Images/Voting/Down.svg"

import {loremIpsum} from "../Constant.jsx"

export class WindowVoting extends React.Component {
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
        let VotingData = [
            { object: Activeimg, label: "Active Proposals", id: 14, action: 5, divName: "-window" },
            //{ object: Submitimg, label: "Submit Proposal", id: 13 , action: 4, divName: "-window" },
            { object: Submitimg, label: "Submit Proposal", id: 13 , action: function commingSoon() { }, divName: "-unavailable" },
            //{ object: Historicalimg, label: "Historical Propoals", id: 15, action: 6, divName: "-window" }
            { object: Historicalimg, label: "Historical Propoals", id: 15, action: function commingSoon() { }, divName: "-unavailable" }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(auto, 100px)" }}>
                {VotingData.map((data) =>
                    <Icon divName={data.divName} id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)}/>
                )}
            </div>
        )
    }
}

export class WindowSubmitProposal extends React.Component {
    render() {
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{position: "relative", top: "23px", left: "23px", display: "grid", gridTemplateColumns: "1fr 1fr", gridColumnGap: "50px", gridTemplateRows: "20px 35px", width: "calc(100% - 46px)"}}>
                    <label className="text">Name</label>
                    <label className="text">Expires In</label>
                    <input className="text container" placeholder="Name Here"></input>
                    <div>
                        <input className="text container" placeholder="000" style={{ width: "100px", height: "29px" }}></input>
                        <label className="text textOverflow"> days</label>
                    </div>
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


export class WindowActiveProposals extends React.Component {

    singleProposal(id, title, expires, text) {
        return (
            <div key={id} style={{width: "100%", height: "140px", borderBottom: "solid black 2px"}}>
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
                title: "Orca OS Style",
                expires: "3d 12h 3m 26s",
                text: "Should we keep the desktop style of OrcaOS"
            },
            {
                id: 1,
                title: "Focus on Microloans",
                expires: "3d 12h 3m 26s",
                text: "Should OrcaOS focus on microloans for entrepreneurs"
            },
            {
                id: 2,
                title: "Focus on real time data",
                expires: "3d 12h 3m 26s",
                text: "Should OrcaOS focus on real time data for DeFi"
            },
            {
                id: 3,
                title: "Marketplace for DeFi models",
                expires: "3d 12h 3m 26s",
                text: "Should we build a marketplace for different DeFi models"
            },
            {
                id: 4,
                title: "Logo update",
                expires: "3d 12h 3m 26s",
                text: "Should we update the logo"
            },
            {
                id: 5,
                title: "Fee update",
                expires: "3d 12h 3m 26s",
                text: "We plan to offer a 2% fee on our optimization pool. Should we increase from 2.0% to 2.5%"
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

export class WindowHistoricalProposals extends React.Component {
    render() {
        let HistoricalProposals = [
            {
                id: 0,
                title: "Chande Color Scheme",
                vote: false,
                time: "2 days",
                text: loremIpsum,
                compact: false
            },
            {
                id: 1,
                title: "Launch Mobile App",
                vote: true,
                time: "25 days",
                text: loremIpsum,                
                compact: true
            },
            {
                id: 2,
                title: "Burn Tokens",
                vote: false,
                time: "30 days",
                text: loremIpsum,                
                compact: true
            }
        ]
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{ width: "100%", height: "30px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr", backgroundColor: "white", borderBottom: "solid black 2px" }}>
                    <div style={{borderRight: "solid black 1px", display: "flex", justifyContent: "center" }}>
                        <img src={Filterimg} alt="Filter"/>
                        <label className="text" style={{paddingTop: "5px"}}>  Filter</label>
                    </div>
                    <div style={{borderLeft: "solid black 1px", display: "flex", justifyContent: "center" }}>
                        <img src={Sortimg} alt="Sort"/>
                        <label className="text" style={{paddingTop: "5px"}}>  Sort By</label>
                    </div>
                </div>
                <div style={{ width: "100%", height: "12px", backgroundColor: "#bcbec0", borderBottom: "solid black 2px" }}></div>
                {HistoricalProposals.map((data) =>
                    <PostProposalReview key={data.id} id={data.id} title={data.title} vote={data.vote} time={data.time} text={data.text} compact={data.compact}/>
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
            <div key={this.state.id} style={{width: "100%", height: "150px", borderBottom: "solid black 2px"}}>
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
                <div style={{ position: "relative", width: "100%", height: "25px", bottom: "0px", borderTop: "solid black 2px", backgroundColor: "white", top: "27px", display: "flex", justifyContent: "center" }}>
                    <img style={{position: "relative", top: "-3px"}} src={this.state.compact ? Downimg : Upimg} alt={this.state.compact ? "Compacted" : "Expanded" }/>
                </div>
                <div style={{ width: "100%", height: "5px", backgroundColor: "#bcbec0", borderTop: "solid black 2px", top: "20px", position: "relative" }}></div>
            </div>
        );
    }
}