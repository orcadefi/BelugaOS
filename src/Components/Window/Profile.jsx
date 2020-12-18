import React from 'react'
import ReactDOM from 'react-dom'

import { addWindow } from '../../Functions/addWindow.jsx'
import { windowIDs } from '../Constant.jsx';
import createWindow from '../../Functions/createWindow.ts';
import * as globalContext from '../../Functions/globalContext.ts';
import getWeb3 from "../../Functions/getWeb3"

import Icon from "../Icon"

import BorrowHistoryimg from "../../Images/Profile/BorrowHistory.svg"
import LendHistoryimg from "../../Images/Profile/LendHistory.svg"
import Messagesimg from "../../Images/Profile/Messages.svg"
import VerifiedIdentityimg from "../../Images/Profile/VerifiedIdentity.svg"
import anonymousimg from "../../Images/Lend/anonymous.svg"
import LendUserimg from "../../Images/Lend/User.svg"

import Emojiimg from "../../Images/Profile/Emoji.svg"
import Clipimg from "../../Images/Profile/Clip.svg"
import NextArrowimg from "../../Images/NextArrow.svg"
import Checkedboximg from "../../Images/Checkedbox.svg"
import Uncheckedboximg from "../../Images/Uncheckedbox.svg"
import Checkimg from "../../Images/Check.svg"
import Imgicoimg from "../../Images/imgico.svg"
import Verifiedimg from "../../Images/Verified.svg"

import { metamaskAlert } from "../../Functions/alertWindow";

//import {usersRegister} from "../../Functions/APIFetch.ts"

const HEROKU_NO_CORS = 'https://orcadefi.herokuapp.com/';

export class WindowProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            challenge: undefined,
            signature: undefined
        }
        const accounts = globalContext.getGlobal('account');
        const token = globalContext.getGlobal('token');
        if (accounts === undefined || token === undefined) {
            this.connect();
        }
    }

    getAccounts = async () => {
        const web3 = globalContext.getGlobal('web3')
        try {
            const acc = await web3.request({ method: 'eth_requestAccounts' });
            globalContext.setGlobal({ account: acc });
        } catch (err) {
            throw new Error("Plese connect metamask");
        }
    }

    getChallenge = async () => {
            const accounts = globalContext.getGlobal('account');
        if (accounts === undefined) {
            throw new Error("Please connect a metamask account")
        }

        let resJson;
        try {
            const res = await fetch(
                HEROKU_NO_CORS + `http://orcadefi.com:8080/auth/${accounts[0].toLowerCase()}`
            );
            resJson = await res.json()
        } catch (err) {
            throw new Error("Error fetching challenge, please try again")
        }
        this.setState({ challenge: resJson });
    };

    signChallenge = async () => {
        const web3 = globalContext.getGlobal('web3')
        const accounts = globalContext.getGlobal('account');
        const { challenge } = this.state;
        let result = null;
        try {
            result = await web3.request({ method: "eth_signTypedData", params: [challenge, accounts[0]] })
        } catch (err) {
            console.log(err)
            throw new Error("Please sign the challenge to Log In")
        }
        this.setState({ signature: result });
    };

    verifySignature = async () => {
        const { challenge, signature } = this.state;
        const res = await fetch(
            HEROKU_NO_CORS + `http://orcadefi.com:8080/auth/${challenge[1].value}/${signature}`
        );

        let recovered = null
        try {
            recovered = await res.json();
        } catch (err) {
            throw new Error("Error sending signature, please try again")
        }

        if (res.status === 200 && recovered.mensaje === "Authentication successful") {
            const status = (
                <div>
                    <label>{"Logged in successfully"}</label>
                </div>
            )
            metamaskAlert(status);
            globalContext.setGlobal({ token: recovered.token });
        } else {
            const status = (
                <div>
                    <label>{"An error occurred, please try again"}</label>
                </div>
            )
            metamaskAlert(status);
        }
    };

    connect = async () => {

        let web3;
        try {
            web3 = await getWeb3();
        } catch (err) {
            const error = (
                <div>
                    <label>{err}</label>
                    <br/>
                    <button className="activeButton" onClick={ () => window.open('https://metamask.io/download.html', '_blank') }>Visit metamask.com</button>
                </div>
            )
            metamaskAlert(error);
            return
        }
        
        globalContext.setGlobal({ web3: web3 });
        try {
            await this.getAccounts();
            await this.getChallenge();
            await this.signChallenge();
            await this.verifySignature();    
        } catch (err) {
            const error = (
                <div>
                    <label>{err.message}</label>
                </div>
            )
            metamaskAlert(error);
            return
        }


    };

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
        } catch (error) { }
        try {
            y = parseInt(y, 10);
        } catch (error) { }
        let w;
        let h;
        try {
            w = parseInt(ldiv.style.width, 10);
        } catch (error) { }
        try {
            h = parseInt(ldiv.style.height, 10);
        } catch (error) { }
        let windowToCreate = addWindow(windowIDs[action], w, h, x, y);
        createWindow(action, windowToCreate)
        let thisDiv = ReactDOM.findDOMNode(this).parentNode.parentNode.parentNode.parentNode.parentNode;
        thisDiv.parentNode.removeChild(thisDiv)
    }

    render() {
        let ProfileData = [
            //{ object: Messagesimg, label: "Messages", id: 20, action: 26, divName: "-window" },
            { object: Messagesimg, label: "Messages", id: 20, action: function commingSoon() { }, divName: "-unavailable" },
            //{ object: VerifiedIdentityimg, label: "Verified Identity", id: 21, action: 27, divName: "-window" },
            { object: VerifiedIdentityimg, label: "Verified Identity", id: 21, action: function commingSoon() { }, divName: "-unavailable" },
            //{ object: BorrowHistoryimg, label: "Borrow History", id: 22, action: 28, divName: "-window" },
            { object: BorrowHistoryimg, label: "Borrow History", id: 22, action: function commingSoon() { }, divName: "-unavailable" },
            //{ object: LendHistoryimg, label: "Lend History", id: 23, action: 29, divName: "-window" }
            { object: LendHistoryimg, label: "Lend History", id: 23, action: function commingSoon() { }, divName: "-unavailable" },
        ]
        return (
            <div className="window-grid">
                {ProfileData.map((data) =>
                    <Icon divName={data.divName} id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)} />
                )}
            </div>
        )
    }
}

export class WindowMessages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chat: null,
            users: [],
            messages: []
        }
        this.getMessages = this.getMessages.bind(this);
        this.getChatUsers = this.getChatUsers.bind(this);
        this.userDiv = this.userDiv.bind(this);
        this.messagesDiv = this.messagesDiv.bind(this);
    }

    getChatUsers = () => {
        const data = [
            {
                id: 0,
                name: "Craig",
                image: LendUserimg,
                last: "Lorem ipsum dolor sit amet"
            },
            {
                id: 1,
                name: "Craig",
                last: "Lorem ipsum dolor sit amet"
            },
            {
                id: 2,
                name: "Craig",
                image: LendUserimg,
                last: "Lorem ipsum dolor sit amet"
            }
        ]

        this.setState({ users: data });
    }

    getMessages = (id) => {
        let data = [
            {
                id: 0,
                type: 0,
                message: "Lorem ipsum dolor sit amet"
            },
            {
                id: 1,
                type: 0,
                message: "ctetuer adipiscing elit"
            },
            {
                id: 2,
                type: 1,
                message: "ctetuer adipiscing elit"
            },
            {
                id: 3,
                type: 1,
                message: "Lorem ipsum dolor sit amet"
            },
            {
                id: 4,
                type: 1,
                message: "Hola"
            },
            {
                id: 5,
                type: 1,
                message: "mundo!"
            },
            {
                id: 6,
                type: 0,
                message: "Hello"
            },
            {
                id: 7,
                type: 0,
                message: "World!"
            },
            {
                id: 8,
                type: 0,
                message: "Im friend of Craig"
            },
            {
                id: 9,
                type: 1,
                message: "Yeah, thas the english version of Hola mundo"
            },
            {
                id: 10,
                type: 1,
                message: "And yes"
            },
            {
                id: 11,
                type: 1,
                message: "You're my friend!"
            },

        ]

        this.setState({ messages: data });
    }

    userDiv = () => {
        return (
            this.state.users.map((data) =>
                <div className="chatUser" style={{ position: "relative", width: "100%", height: "70px", display: "grid", gridTemplateColumns: "75px 1fr", gap: "5px" }}>
                    <div style={{ width: "75px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "55px", height: "55px", border: "solid white 2px", borderRadius: "50%", overflow: "hidden" }}>
                            <img alt="Userphoto" src={data.image !== undefined ? data.image : anonymousimg} style={{ width: "55px", height: "55px" }}>
                            </img>
                        </div>
                    </div>
                    <div style={{ alignSelf: "center" }}>
                        <label className="text">
                            {data.name}
                        </label>
                        <br />
                        <label className="text" style={{ fontSize: "10px", display: "inline-block", maxHeight: "28px", overflow: "hidden" }}>
                            {data.last}
                        </label>
                    </div>
                </div>
            )
        )
    }

    messagesDiv = (id) => {
        return (
            <div style={{ position: "relative", top: "15px", width: "100%", height: "calc(100% - 15px)" }}>
                {this.state.messages.map((data) =>
                    <div style={{ width: "100%", height: "fit-content", overflow: "hidden" }}>
                        <div className={data.type === 0 ? "receivedMessage" : "sentMessage"}>
                            {data.message}
                        </div>
                    </div>
                )}
            </div>
        )
    }

    componentDidMount = () => {
        this.getMessages();
        this.getChatUsers();
    }

    render() {
        return (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "2fr 3fr", gridTemplateRows: "100%" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", borderRight: "solid black 2px", overflowY: "auto" }}>
                    <div style={{ position: "relative", width: "100%", height: "calc(100% - 10px)", top: "8px" }}>
                        {this.userDiv()}
                    </div>
                </div>
                <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "1fr 24px", backgroundColor: "#d1d3d4" }}>
                    <div style={{ width: "100%", height: "100%", overflowX: "auto" }}>
                        {this.messagesDiv()}
                    </div>
                    <div style={{ position: "relative", width: "calc(100% - 24px)", borderTop: "solid black 2px", height: "22px", display: "grid", gridTemplateColumns: "30px 15px 1fr 55px", gridTemplateRows: "1fr", backgroundColor: "#f1f2f2" }}>
                        <img alt="emoji" src={Emojiimg} style={{ height: "75%", alignSelf: "center", justifySelf: "center" }} />
                        <img alt="file" src={Clipimg} style={{ height: "75%", alignSelf: "center", justifySelf: "center" }} />
                        <input className="text input-messager" style={{ backgroundColor: "transparent" }} placeholder="Type Message" />
                        <input className="text input-submit" type="submit" value="SEND" style={{}} />
                    </div>
                </div>
            </div>
        )
    }
}


export class WindowVerifyIdentity extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            checkPhone: false,
        }
    }

    submit = async () => {
        this.nextStep();
    }

    nextStep = (data) => {
        let nextStep = this.state.step + 1;
        if (nextStep > 0 && nextStep < 5) {
            this.setState({ step: nextStep })
        } else {
            this.setState({ step: 1 })
        }
    }

    readStep = () => {
        if (this.state.step === 1) {
            return this.stepOne();
        } else if (this.state.step === 2) {
            return this.stepTwo();
        } else if (this.state.step === 3) {
            return this.stepThree();
        } else if (this.state.step === 4) {
            return this.submitView();
        } else {
            this.setState({step: 1})
            return this.stepOne();
        }
    }

    stepOne = () => {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "100%" }}>
                <div style={{ position: "relative", width: "calc(100% - 23px)", height: "44px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", rowGap: "4px", columnGap: "36px" }}>
                    <label className="text" style={{ fontSize: "14px" }}>First Name</label>
                    <label className="text" style={{ fontSize: "14px" }}>Last Name</label>
                    <input className="text" placeholder="First Name" style={{ backgroundColor: "#bcbec0", border: "solid black 2px" }} />
                    <input className="text" placeholder="Last Name" style={{ backgroundColor: "#bcbec0", border: "solid black 2px" }} />
                </div>
                <div style={{ position: "relative", top: "30px" }}>
                    <label className="text" style={{ fontSize: "14px" }}>Date of Birth</label>
                    <div style={{ position: "relative", width: "calc(100% - 23px)", height: "25px", display: "grid", gridTemplateColumns: "calc(8px + 3ch) 2ch calc(8px + 3ch) 2ch calc(8px + 6ch)", gridTemplateRows: "1fr", textAlign: "center" }}>
                        <input className="text" placeholder="DD" style={{ backgroundColor: "#bcbec0", border: "solid black 2px", width: "calc(100% -4px)", height: "calc(100% -4px)", textAlign: "center" }} />
                        <label className="text">/</label>
                        <input className="text" placeholder="MM" style={{ backgroundColor: "#bcbec0", border: "solid black 2px", width: "calc(100% -4px)", height: "calc(100% -4px)", textAlign: "center" }} />
                        <label className="text">/</label>
                        <input className="text" placeholder="YYYY" style={{ backgroundColor: "#bcbec0", border: "solid black 2px", width: "calc(100% -4px)", height: "calc(100% -4px)", textAlign: "center" }} />
                    </div>
                </div>
                <div className="activeButton" onClick={() => this.nextStep()} style={{ position: "relative", top: "30px", float: "right", right: "25px", width: "70px", height: "20px", textAlign: "center" }}>
                    <label className="text" style={{ fontSize: "14px" }}>Next</label>
                    <img alt="next" src={NextArrowimg} style={{ width: "20px", height: "12px" }} />
                </div>
                <div style={{ position: "fixed", width: "calc(100% - 74px)", height: "42px", bottom: "23px" }}>
                    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "14px 14px 10px" }}>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "1", gridRow: "1" }}>Step 1</label>
                        <div style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", gridColumn: "1", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px" }}></div>
                        <div style={{ width: "calc(100% - 2px)", height: "calc(100% - 4px)", gridColumn: "2 / 4", gridRow: "3", backgroundColor: "transparent", border: "solid black 2px", borderLeft: "none" }}></div>
                    </div>
                </div>
            </div>
        )
    }

    stepTwo = () => {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "100%" }}>
                <div style={{ position: "relative", width: "calc(100% - 23px)", height: "49px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "20px 25px", rowGap: "4px", columnGap: "36px" }}>
                    <label className="text" style={{ fontSize: "14px" }}>Phone Number</label>
                    <label className="text" style={{ fontSize: "14px" }}>Verification Code</label>
                    <input className="text" placeholder="Phone Number" style={{ backgroundColor: "#bcbec0", border: "solid black 2px" }} />
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
                        <input className="text" style={{ backgroundColor: "#bcbec0", border: "solid black 2px", width: "calc(100% - 33px)", position: "relative" }} />
                        <img style={{ marginLeft: "auto", width: "15px", height: "15px" }} alt={this.state.checkPhone ? "checked" : "unchecked"} src={this.state.checkPhone ? Checkedboximg : Uncheckedboximg} />
                    </div>
                </div>
                <div style={{ position: "relative", width: "calc(100% - 23px)", height: "49px", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "20px 25px", rowGap: "4px", columnGap: "36px", top: "20px" }}>
                    <label className="text" style={{ fontSize: "14px" }}>Email</label>
                    <label className="text" style={{ fontSize: "14px" }}>Verification Code</label>
                    <input className="text" placeholder="Email" style={{ backgroundColor: "#bcbec0", border: "solid black 2px" }} />
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center" }}>
                        <input className="text" style={{ backgroundColor: "#bcbec0", border: "solid black 2px", width: "calc(100% - 33px)", position: "relative" }} />
                        <img style={{ marginLeft: "auto", width: "15px", height: "15px" }} alt={this.state.checkPhone ? "checked" : "unchecked"} src={this.state.checkPhone ? Checkedboximg : Uncheckedboximg} />
                    </div>
                </div>
                <div className="activeButton" onClick={() => this.nextStep()} style={{ position: "relative", top: "40px", float: "right", right: "25px", width: "70px", height: "20px", textAlign: "center" }}>
                    <label className="text" style={{ fontSize: "14px" }}>Next</label>
                    <img alt="next" src={NextArrowimg} style={{ width: "20px", height: "12px" }} />
                </div>
                <div style={{ position: "fixed", width: "calc(100% - 74px)", height: "42px", bottom: "23px" }}>
                    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "14px 14px 10px" }}>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "1", gridRow: "1" }}>Step 1</label>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "2", gridRow: "1" }}>Step 2</label>
                        <div style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", gridColumn: "1", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px", borderLeft: "solid black 2px" }}></div>
                        <div style={{ width: "calc(100% - 2px)", height: "calc(100% - 4px)", gridColumn: "2", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px", borderLeft: "none" }}></div>
                        <div style={{ width: "calc(100% - 2px)", height: "calc(100% - 4px)", gridColumn: "3", gridRow: "3", backgroundColor: "transparent", border: "solid black 2px", borderLeft: "none" }}></div>
                    </div>
                </div>
            </div>
        )
    }

    stepThree = () => {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "100%" }}>
                <label className="text" style={{ width: "calc(100% - 23px)" }}>Upload Documents</label>
                <br />
                <label className="text" style={{ fontSize: "12px", width: "calc(100% - 23px)" }}>To confirm you are you, please upload image of these following documents</label>
                <div style={{ position: "relative", width: "calc(100% - 23px)", minHeight: "84px" }}>
                    <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "18px 35px 21px", columnGap: "10px", rowGap: "5px", justifyItems: "center" }}>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "1", gridRow: "1" }}>ID Card</label>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "2", gridRow: "1" }}>Electricity Bill</label>
                        <div className="regProfileDoc" style={{ gridColumn: "1", gridRow: "2"}}><img style={{ width: "60%", height: "60%", margin: "auto" }} alt="ID" src={Imgicoimg} /></div>
                        <div className="regProfileDoc" style={{ gridColumn: "2", gridRow: "2"}}><img style={{ width: "60%", height: "60%", margin: "auto" }} alt="ID" src={Imgicoimg} /></div>
                        <div className="activeButton" onClick={() => this.submit()} style={{ width: "85px", height: "20px", textAlign: "center", marginLeft: "auto", gridColumn: "3", gridRow: "3" }}>
                            <label className="text" style={{ fontSize: "14px" }}>Submit</label>
                            <img alt="next" src={Checkimg} style={{ width: "24px", height: "11px" }} />
                        </div>
                    </div>
                </div>

                <div style={{ position: "fixed", width: "calc(100% - 74px)", height: "42px", bottom: "23px" }}>
                    <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "14px 14px 10px" }}>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "1", gridRow: "1" }}>Step 1</label>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "2", gridRow: "1" }}>Step 2</label>
                        <label className="text" style={{ textAlign: "center", fontSize: "14px", gridColumn: "3", gridRow: "1" }}>Step 3</label>
                        <div style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", gridColumn: "1", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px" }}></div>
                        <div style={{ width: "calc(100% - 2px)", height: "calc(100% - 4px)", gridColumn: "2", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px", borderLeft: "none" }}></div>
                        <div style={{ width: "calc(100% - 2px)", height: "calc(100% - 4px)", gridColumn: "3", gridRow: "3", backgroundColor: "#f2be48", border: "solid black 2px", borderLeft: "none" }}></div>
                    </div>
                </div>
            </div>
        )
    }

    submitView = () => {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "100%" }}>
                <div style={{ position: "relative", width: "calc(100% - 23px)", height: "min-content", display: "grid", gridTemplateColumns: "55px 1fr", gridTemplateRows: "1fr", columnGap: "10px" }}>
                    <img alt="Verified" src={Verifiedimg} style={{width: "80%", height: "80%", alignSelf: "center", justifySelf: "center"}} />
                    <label className="text" style={{ fontSize: "20px" }}>Thank you for completing registration form</label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "calc(100% - 23px)", top: "23px", left: "23px" }}>
                {this.readStep()}
            </div>
        )
    }
}

export class WindowBorrowHistory extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

export class WindowLendHistory extends React.Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}