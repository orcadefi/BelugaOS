import React from 'react'
import ReactDOM from 'react-dom'

import { addWindow } from '../../Functions/addWindow.jsx'
import { windowIDs } from '../Constant.jsx';
import createWindow from '../../Functions/createWindow.ts';

import Metamask from "../Metamask"
import Icon from "../Icon"

import BorrowHistoryimg from "../../Images/Profile/BorrowHistory.svg"
import LendHistoryimg from "../../Images/Profile/LendHistory.svg"
import Messagesimg from "../../Images/Profile/Messages.svg"
import VerifiedIdentityimg from "../../Images/Profile/VerifiedIdentity.svg"
import anonymousimg from "../../Images/Lend/anonymous.svg"
import LendUserimg from "../../Images/Lend/User.svg"

export class WindowProfile extends React.Component {

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
            { object: Messagesimg, label: "Messages", id: 20, action: 26 },
            { object: VerifiedIdentityimg, label: "Verified Identity", id: 21, action: 27 },
            { object: BorrowHistoryimg, label: "Borrow History", id: 22, action: 28 },
            { object: LendHistoryimg, label: "Lend History", id: 23, action: 29 }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(3, 100px)" }}>
                {ProfileData.map((data) =>
                    <Icon divName="-window" id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)} />
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
        ]

        this.setState({ messages: data });
    }

    userDiv = () => {
        console.log(this.state)
        return (
            this.state.users.map((data) =>
                <div className="chatUser" style={{ position: "relative", width: "100%", height: "70px", display: "grid", gridTemplateColumns: "75px 1fr", gap: "5px" }}>
                    <div style={{ width: "75px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "55px", height: "55px", border: "solid white 2px", borderRadius: "50%", overflow: "hidden" }}>
                            <img alt="Userphoto" src={data.image !== undefined ? data.image : anonymousimg} style={{width: "55px", height: "55px"}}>
                            </img>
                        </div>
                    </div>
                    <div style={{alignSelf: "center"}}>
                        <label className="text">
                            {data.name}
                        </label>
                        <br/>
                        <label className="text" style={{fontSize: "10px", display: "inline-block", maxHeight: "28px", overflow: "hidden"}}>
                            {data.last}
                        </label>
                    </div>
                </div>
            )
        )
    }

    messagesDiv = (id) => {
        return (
            <div>
                {this.state.messages.map((data) =>
                    <div>
                        {data.message}
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
            <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "2fr 3fr" }}>
                <div style={{position: "relative", width: "100%", height: "100%", borderRight: "solid black 2px"}}>
                    <div style={{ position: "relative", width: "100%", height: "calc(100% - 10px)", overflowY: "auto", top: "8px"}}>
                        {this.userDiv()}
                    </div>
                </div>
                <div style={{ position: "relative", width: "100%", height: "100%", overflowY: "auto" }}>
                    {this.messagesDiv()}
                </div>
            </div>
        )
    }
}


export class WindowVerifyIdentity extends React.Component {

    readStep = () => {
        return 1;
    }

    stepOne = () => {

    }

    stepTwo = () => {

    }

    stepThree = () => {

    }

    render() {
        return (
            <div style={{ position: "relative", width: "calc(100% - 23px)", height: "calc(100% - 23px)", top: "23px", left: "23px" }}>

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