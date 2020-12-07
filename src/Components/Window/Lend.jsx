import React from 'react'
import ReactDOM from 'react-dom'
import Icon from '../Icon.jsx'
import createWindow from '../../Functions/createWindow.ts'
import { addWindow } from '../../Functions/addWindow.jsx'
import { windowIDs, loremIpsum } from '../Constant.jsx';

import LendLookingimg from "../../Images/Lend/LendLooking.svg"
import LendActiveimg from "../../Images/Lend/LendActive.svg"
import LendPreviousimg from "../../Images/Lend/LendPrevious.svg"
import LendStatsimg from "../../Images/Lend/LendStats.svg"
import Carimg from "../../Images/Lend/Car.svg"
import WebSiteimg from "../../Images/Lend/WebSite.svg"
import Userimg from "../../Images/Lend/User.svg"
import anonymousimg from "../../Images/Lend/anonymous.svg"
import Star1img from "../../Images/Lend/1Star.svg"
import Star0img from "../../Images/Lend/0Star.svg"
import Chatimg from "../../Images/Lend/Chat.svg"
import Commentimg from "../../Images/Lend/Comment.svg"
import Topimg from "../../Images/Lend/Top.svg"
import Imgicoimg from "../../Images/imgico.svg"
import Checkedboximg from "../../Images/Checkedbox.svg"
import Uncheckedboximg from "../../Images/Uncheckedbox.svg"

export class WindowLend extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
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

    LendData = [
        { object: LendLookingimg, label: "Projects Looking for Funding", id: 16, action: 10 },
        { object: LendActiveimg, label: "Active Projects", id: 17, action: 11 },
        { object: LendPreviousimg, label: "Previous Loans", id: 18, action: 12 },
        { object: LendStatsimg, label: "Stats", id: 19, action: 13 }
    ]

    render() {
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(auto, 100px)" }}>
                {this.LendData.map((data) =>
                    <Icon divName="-window" id={data.id} key={data.id} src={data.object} alt={data.label} label={data.label} action={typeof data.action === "function" ? data.action : () => this.changeWindow(data.action)} />
                )}
            </div>

        )
    }
}

export class WindowLendLooking extends React.Component {

    cards = (title, image, username, userimage, views, stars, complete, rising, id) => {
        let starsDiv = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        for (let i = 0; i < stars; i = i + 1) {
            Object.assign(starsDiv[i], { star: Star1img });
        }
        for (let i = 4; i >= stars; i = i - 1) {
            Object.assign(starsDiv[i], { star: Star0img });
        }
        return (
            <div key={id} className="icon-div-window" style={{ textAlign: "center" }}>
                <label className="text" >{title}</label>
                <div style={{ position: "relative", width: "125px", height: "75px", left: "20%", borderRadius: "10px 10px 10px 10px" }}>
                    {image !== undefined ? <img style={{ minWidth: "max(100%)", minHeight: "max(100%)", maxWidth: "125px", maxHeight: "75px" }} src={image} alt={title} /> : <div style={{ width: "100%", height: "100%", backgroundColor: "#666666" }} />}
                    <label className="text textOverflow" style={{ position: "absolute", width: "90px", top: "45px", left: "25px", color: "white", fontSize: "14px" }}>{username}</label>
                    <label className="text textOverflow" style={{ position: "absolute", width: "90px", top: "60px", left: "15px", color: "white", fontSize: "9px" }}>{views} Views</label>
                    <div style={{ position: "absolute", top: "50px", left: "-12px", borderRadius: "50%", width: "40px", height: "40px", overflow: "hidden", border: "solid white 2px" }}>
                        <img style={{ minWidth: "max(100%)", minHeight: "max(100%)", maxWidth: "40px", maxHeight: "40px" }} src={userimage !== undefined ? userimage : anonymousimg} alt={username} />
                    </div>
                    <div style={{ position: "absolute", right: "5px", display: "grid", gridTemplateColumns: "repeat(5, 13px)", gridGap: "5px" }}>{starsDiv.map((data) =>
                        <img key={data.id} src={data.star} alt="star" />
                    )}</div>
                    <div style={{ position: "relative", top: "20px", width: "100%", height: "12px", display: "flex" }}>
                        <label className="text textOverflow" style={{ width: "50%", height: "100%", fontSize: "8px" }} >{complete}% Complete</label>
                        <div style={{ width: "50%", height: "100%", backgroundColor: "#bcbec0", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: "" + complete + "%", height: "100%", backgroundColor: "#f29224" }} />
                        </div>
                    </div>
                    <label className="text textOverflow" style={{ position: "absolute", top: "113px", width: "100%", height: "8px", fontSize: "8px", textAlign: "initial", left: "3px" }} >Rising {rising}</label>
                </div>
            </div>
        )
    }

    render() {
        let LookingData = [
            {
                title: "My Car Project",
                image: Carimg,
                username: "Username",
                userimage: Userimg,
                views: 7280,
                stars: 4,
                complete: 20,
                rising: "150.000 USD",
                id: 0
            },
            {
                title: "My Website",
                image: WebSiteimg,
                username: "Username",
                userimage: Userimg,
                views: 7280,
                stars: 4,
                complete: 20,
                rising: "150.000 USD",
                id: 1
            },
            {
                title: "My Car Project",
                image: "https://m.atcdn.co.uk/vms/media/w640/62ec681ac0164091b0de567d96a49e92.jpg",
                username: "Other longer Username",
                userimage: undefined,
                views: 7280,
                stars: 4,
                complete: 20,
                rising: "150.000 USD",
                id: 2
            },
            {
                title: "My My Website",
                image: undefined,
                username: "Username",
                userimage: undefined,
                views: 7280,
                stars: 4,
                complete: 20,
                rising: "150.000 USD",
                id: 3
            }
        ]
        return (
            <div className="window-grid" style={{ gridTemplateColumns: "repeat(3, 180px)", gridAutoRows: "160px", gridTemplateRows: "unset" }}>
                {LookingData.map((data) =>
                    this.cards(data.title, data.image, data.username, data.userimage, data.views, data.stars, data.complete, data.rising, data.id)
                )}
            </div>
        )
    }
}

export class WindowLendActive extends React.Component {

    on_click_button = (x) => {
        console.log(x)
    }

    render() {
        let LendActive = [
            {
                userimage: Userimg,
                borrower: "Craig",
                Project: "Car Repair Loan",
                Total_Loaned: "4.2 ETH",
                APR: "8.2%",
                Repayment_in: "12d 3h 20m",
                id: 0
            },
            {
                userimage: anonymousimg,
                borrower: "Craig",
                Project: "Car Repair Loan",
                Total_Loaned: "4.2 ETH",
                APR: "8.2%",
                Repayment_in: "12d 3h 20m",
                id: 1
            },
            {
                userimage: anonymousimg,
                borrower: "Craig",
                Project: "Car Repair Loan",
                Total_Loaned: "4.2 ETH",
                APR: "8.2%",
                Repayment_in: "12d 3h 20m",
                id: 2
            }
        ]
        return (
            <div>
                <table style={{ position: "relative", left: "23px", top: "23px", borderSpacing: "10px", width: "725px", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            <th className="text" style={{ width: "110px", height: "20px" }}>Borrower</th>
                            <th className="text" style={{ width: "150px", height: "20px" }} >Project</th>
                            <th className="text" style={{ width: "115px", height: "20px" }} >Total Loaned</th>
                            <th className="text" style={{ width: "90px", height: "20px" }} >APR</th>
                            <th className="text" style={{ width: "160px", height: "20px" }} >Repayment in</th>
                            <th className="text" style={{ width: "100px", height: "20px" }} ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {LendActive.map((data) =>
                            <tr key={data.id}>
                                <td className="text" style={{ width: "110px", height: "120px", textAlign: "center" }} ><div style={{ borderRadius: "50%", width: "55px", height: "55px", overflow: "hidden", left: "calc(calc(100% - 55px) / 2)", position: "relative", border: "solid white 2px" }}><img style={{ width: "55px", height: "55px" }} src={data.userimage} alt="userimage" /></div> {data.borrower}</td>
                                <td className="text" style={{ width: "150px", height: "20px", textAlign: "center" }} >{data.Project}</td>
                                <td className="text" style={{ width: "115px", height: "20px", textAlign: "center" }} >{data.Total_Loaned}</td>
                                <td className="text" style={{ width: "90px", height: "20px", textAlign: "center" }} >{data.APR}</td>
                                <td className="text" style={{ width: "160px", height: "20px", textAlign: "center" }} >{data.Repayment_in}</td>
                                <td className="text" style={{ width: "100px", height: "20px", textAlign: "center" }} >
                                    <button className="text activeButton" onClick={() => this.on_click_button(data.id)} style={{ width: "95px", height: "22px" }}>
                                        See detail
                                    </button>
                                    <button className="text forButton" onClick={() => this.on_click_button(data.id)} style={{ width: "95px", height: "22px" }}>
                                        <img src={Chatimg} alt="Chat" style={{ height: "14px" }} className="vertical-center" />  Chat
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export class WindowLendPrevious extends React.Component {

    on_click_button = (x) => {
        console.log(x)
    }

    seeActiveLoans = () => {
        const action = 11;
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
        let LendPrevData = [
            {
                userimage: undefined,
                username: "Craig",
                title: "Car Repair Loan",
                status: "EXPIRED",
                id: 0
            },
            {
                userimage: undefined,
                username: "Craig",
                title: "Car Repair Loan",
                status: "EXPIRED",
                id: 1
            }
        ]

        return (
            <div style={{ position: "relative", width: "100%", minHeight: "100%" }}>
                <table style={{ minWidth: "670px", borderSpacing: "10px", tableLayout: "fixed", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "solid black 2px" }}>
                            <th className="text" style={{ width: "110px", height: "50px" }}>Borrower</th>
                            <th className="text" style={{ minWidth: "450px", height: "50px", borderRight: "solid black 2px", borderLeft: "solid black 2px" }}>Project Loans</th>
                            <th className="text" style={{ width: "110px", height: "50px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {LendPrevData.map((data) =>
                            <tr key={data.id} style={{ borderBottom: "solid black 2px" }}>
                                <td className="text" style={{ minWidth: "110px", height: "120px", textAlign: "center" }} ><div style={{ borderRadius: "50%", width: "55px", height: "55px", overflow: "hidden", left: "calc(calc(100% - 55px) / 2)", position: "relative", border: "solid white 2px" }}><img style={{ width: "55px", height: "55px" }} src={data.userimage !== undefined ? data.userimage : anonymousimg} alt="userimage" /></div> {data.username}</td>
                                <td className="text" style={{ minWidth: "450px", height: "120px", textAlign: "center", borderRight: "solid black 2px", borderLeft: "solid black 2px" }}>
                                    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 180px" }}>
                                        <label className="text vertical-center" style={{ height: "fit-content" }}>{data.title}</label>
                                        <div className={"button-" + data.status + " vertical-center"} style={{ fontSize: "16px", textAlign: "center" }}><label style={{ display: "block", padding: "4px 0" }}>{data.status}</label></div>
                                    </div>
                                </td>
                                <td className="text" style={{ minWidth: "170px", height: "120px", textAlign: "center" }}>
                                    <div style={{ width: "150px", position: "relative", marginLeft: "auto", marginRight: "auto" }}>
                                        <button className="text activeButton" onClick={() => this.on_click_button(data.id)} style={{ width: "150px", height: "60px", display: "block", alignSelf: "start" }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr" }}>
                                                <img className="vertical-center" src={Commentimg} alt="Comment Button" />
                                                <label className="vertical-center" style={{ justifyContent: "left" }}>Comment Publicly</label>
                                            </div>
                                        </button>
                                        <button className="text forButton" onClick={() => this.on_click_button(data.id)} style={{ width: "95px", height: "22px", display: "block", alignSelf: "start", marginTop: "6px" }}>
                                            <img src={Chatimg} alt="Chat" style={{ height: "14px" }} className="vertical-center" />  Chat
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                        <tr key={-1}>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="text activeButton" onClick={() => this.seeActiveLoans()} style={{ width: "150px", height: "22px" }}>
                                    SEE ACTIVE LOANS
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export class WindowLendStats extends React.Component {

    valueFormat = (data, type, id) => {
        return (
            <div key={id} style={{ display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "2fr 1fr" }}>
                <div style={{ fontSize: "20px", marginTop: "auto" }}>{data}</div>
                <div style={{ fontSize: "14px", marginBottom: "auto" }}>{type}</div>
            </div>
        )
    }

    render() {
        let LendStatsData = [
            {
                data: "32",
                type: "Loans",
                id: 0
            },
            {
                data: "$42,628",
                type: "Loans",
                id: 1
            },
            {
                data: "$1,326",
                type: "Loans",
                id: 2
            },
            {
                data: "2",
                type: "Successful",
                id: 3
            },
            {
                data: "1",
                type: "Failure",
                id: 4
            },
            {
                data: "4,2%",
                type: "APR",
                id: 5
            }
        ]
        return (
            <div className="text" style={{ position: "relative", width: "calc(100% - 23px)", height: "calc(100% - 23px)", top: "23px", left: "23px", display: "grid", gridTemplateColumns: "110px 110px 110px", gridTemplateRows: "75px 75px", gridGap: "20px", textAlign: "center" }}>
                {LendStatsData.map((data) =>
                    this.valueFormat(data.data, data.type, data.id)
                )}
            </div>
        )
    }
}

export class WindowLendUserPerforming extends React.Component {

    on_click_button = (id) => {
        console.log(id)
    }

    render() {
        let UPLData = {
            image: Topimg,
            user: {
                id: 0,
                name: "Craig",
                image: Userimg
            },
            verification: [
                {name: "Address", value: true},
                {name: "Phone Number", value: false},
                {name: "Email", value: true},
                {name: "ID", value: true}
            ],
            stars: 4,
            Loan_Request: 12,
            Unpaid_Loan: 2,
            Description: loremIpsum,
            looking_for: "USD 100,000",
            complete: 20,
            details: loremIpsum,
            Documents: [
                { name: "Personal ID", url: "https://www.croatiaweek.com/wp-content/uploads/2015/06/mup.jpg?x34489", id: 0 },
                { name: "Bank Documents", url: "https://previews.123rf.com/images/viktorus/viktorus1505/viktorus150500005/40301988-credit-card-bank-account-statement-finance-document-template.jpg", id: 1 }
            ],
            id: 0
        }
        let starsDiv = [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
        for (let i = 0; i < UPLData.stars; i = i + 1) {
            Object.assign(starsDiv[i], { star: Star1img });
        }
        for (let i = 4; i >= UPLData.stars; i = i - 1) {
            Object.assign(starsDiv[i], { star: Star0img });
        }
        return (
            <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr", gridTemplateRows: "80px calc(100% - 80px)" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
                    <img style={{ width: "100%" }} src={UPLData.image} alt="Project cover" />
                </div>
                <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", gridTemplateColumns: "3fr 2fr", gridTemplateRows: "1fr", gridGap: "20px" }}>
                    <div style={{ position: "relative", left: "23px", top: "30px", width: "calc(100% - 23px)" }}>
                        <label className="text" style={{}}>Description</label>
                        <p className="text textOverflow" style={{ whiteSpace: "normal", fontSize: "10px", textAlign: "justify", lineHeight: "13px" }}>{UPLData.Description}</p>
                        <label className="text" style={{ lineHeight: "53px" }}>Looking For {UPLData.looking_for}</label>
                        <div style={{ width: "100%", height: "17px", borderRadius: "4px", backgroundColor: "#bcbec0", overflow: "hidden" }}>
                            <div style={{ position: "relative", left: "0px", height: "100%", width: UPLData.complete + "%", backgroundColor: "#f29224" }}></div>
                        </div>
                        <label className="text" style={{ lineHeight: "40px" }}>{UPLData.complete} % Complete</label>
                        <br />
                        <label className="text" style={{ position: "relative", top: "5px", lineHeight: "30px" }}>More Details</label>
                        <p className="text textOverflow" style={{ whiteSpace: "normal", fontSize: "10px", textAlign: "justify", height: "39px", lineHeight: "13px" }}>{UPLData.details}</p>
                        <label className="text" style={{}}>Documents</label>
                        <div style={{ minWidth: "fit-content", minHeight: "6px", border: "solid black 1px", backgroundColor: "#d1d3d4" }}>
                            <div style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)", display: "grid", gridTemplateColumns: "1fr", gridAutoRows: "35px", gridGap: "2px", position: "relative", margin: "2px" }}>
                                {UPLData.Documents.map((data) =>
                                    <div key={data.id} style={{ display: "grid", gridTemplateColumns: "35px 1fr", backgroundColor: "white", border: "solid black 1px" }}>
                                        <div>
                                            <img src={Imgicoimg} alt={data.name} style={{ position: "relative", width: "20px", height: "20px", top: "7px", left: "7px" }} />
                                        </div>
                                        <div style={{ borderLeft: "solid black 1px" }}>
                                            <a target="_blank" rel="noreferrer" href={data.url}><label className="text" style={{ position: "relative", left: "8px", lineHeight: "33px" }}>{data.name}</label></a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                        <div style={{ position: "relative", width: "calc(100% - 23px)", height: "calc(100% - 23px)", top: "23px", left: "0px" }}>
                            <div style={{ width: "100%", height: "80px" }}>
                                <div style={{ width: "60px", height: "60px", borderRadius: "50%", border: "solid white 2px" }}>
                                    <img alt="Userprofile" key={UPLData.user.id} style={{ width: "60px", height: "60px" }} src={UPLData.user.image !== undefined ? UPLData.user.image : anonymousimg} />
                                </div>
                                <label className="text" style={{ position: "relative", left: "85px", top: "-66px" }}>{UPLData.user.name}</label>
                                <div style={{ position: "relative", left: "85px", top: "-66px", display: "grid", gridTemplateColumns: "repeat(5, 13px)", gridGap: "5px" }}>{starsDiv.map((data) =>
                                    <img key={data.id} src={data.star} alt="star" />
                                )}</div>
                                <button className="text forButton" onClick={() => this.on_click_button(UPLData.id)} style={{ width: "70px", height: "22px", position: "relative", left: "85px", top: "-56px" }}>
                                    <img src={Chatimg} alt="Chat" style={{ height: "14px" }} className="vertical-center" />  Chat
                                </button>
                                <div style={{position: "relative", top: "-40px", width: "max-content"}}>
                                    {UPLData.verification.map((data) => 
                                        <div style={{display: "grid", gridTemplateColumns: "14px 1fr", gridTemplateRows: "14px 7px", columnGap: "14px"}}>
                                            <img style={{width: "100%", height: "100%"}} src={ data.value ? Checkedboximg : Uncheckedboximg} alt={ data.value ? "Checked" : "Unchecked"}/>
                                            <label className="text" style={{fontSize : "14px"}}>{data.value ? data.name + " Verified" : data.name + " Unverified"}</label>
                                            <br/>
                                        </div>
                                    )}
                                </div>
                                <label className="text" style={{fontSize: "12px", position: "relative", top: "-25px"}}>{UPLData.Loan_Request} Loan Requests</label>
                                <br/>
                                <label className="text" style={{ fontSize: "12px", position: "relative", top: "-25px" }}>{UPLData.Unpaid_Loan} Unpaid Loans</label>
                                <div style={{display: "grid", gridTemplateColumns: "2fr 3fr 3fr", gridTemplateRows: "34px"}}>
                                    <div style={{ width: "70px", height: "30px", backgroundColor: "#bcbec0", border: "solid black 2px" }}>
                                        <label className="text" style={{lineHeight: "34px", position: "relative", left: "8px"}}>USD</label>
                                        <div style={{position: "relative", top: "-26px", right: "-45px", borderTop: "14px solid #000000", borderLeft: "10px solid transparent", borderRight: "10px solid transparent", width: "0px"}}></div>
                                    </div>
                                    <div style={{ width: "100%", height: "30px", backgroundColor: "#bcbec0", borderTop: "solid black 2px", borderBottom: "solid black 2px", borderRight: "solid black 2px", overflow: "hidden" }}>
                                        <input placeholder="00,00" className="text" style={{lineHeight: "34px", position: "relative", width: "calc(100% - 6px)", height: "calc(100% - 6px)", top: "0px", backgroundColor: "transparent", border: "solid black 0px"}}/>
                                    </div>
                                    <button className="text activeButton" onClick={() => this.on_click_button(UPLData.user.id)} style={{ minWidth: "calc(100% - 25px)", height: "22px", marginTop: "auto", marginBottom: "auto", position: "relative", justifySelf: "center" }}>
                                        LOAN
                                    </button>
                                </div>
                                <button className="text activeButton" onClick={() => this.on_click_button(UPLData.user.id)} style={{ width: "120px", height: "22px", position: "relative", top: "10px"}}>
                                    Request More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}