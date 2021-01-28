import React from 'react';
import "../Casscade style-sheet/Components.css"
import getWeb3 from "../Functions/getWeb3"
import createWindow from '../Functions/createWindow.ts'
import { addWindow } from '../Functions/addWindow.jsx'
import { windowIDs } from './Constant.jsx';
import { setGlobal } from '../Functions/globalContext.ts'

const HEROKU_NO_CORS = 'https://orcadefi.herokuapp.com/';

class Metamask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            web3: null,
            accounts: null,
            challenge: null,
            signature: null 
        };
        this.handleClick = this.handleClick.bind(this);
        this.getAccounts = this.getAccounts.bind(this);
        this.getChallenge = this.getChallenge.bind(this);
        this.signChallenge = this.signChallenge.bind(this);
        this.verifySignature = this.verifySignature.bind(this);
        this.example = this.example.bind(this);
    }

    example = () => {
        createWindow(14, addWindow(windowIDs[14]));
    }

    getAccounts = async () => {
        const acc = await (window).ethereum.request({ method: 'eth_requestAccounts' });
        setGlobal({ account: acc });
        this.setState({ accounts: acc });
    }

    getChallenge = async () => {
        const { accounts } = this.state;

        console.log(HEROKU_NO_CORS)
        const res = await fetch(
            HEROKU_NO_CORS + `http://orcadefi.com:8080/auth/${accounts[0].toLowerCase()}`
        );
        let resJson = await res.json()
        this.setState({ challenge: resJson });
    };

    signChallenge = async () => {
        const { web3, challenge, accounts } = this.state;
        let result = null;
        try {
            result = await web3.currentProvider.request({ method: "eth_signTypedData", params: [challenge, accounts[0]] })
        } catch {
            //TODO
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
        } catch {
            
        }
        if (res.status === 200 && recovered.mensaje === "Authentication successful") {
            console.log("Signature verified");
            window.alert("Logged in successfully")
        } else {
            console.log("Signature not verified");
            window.alert("An error occurred, please try again")
        }
    };

    handleClick = async () => {

        this.setState({
            loading: true,
        });

        const web3 = await getWeb3();
        this.setState({ web3 });
        await this.getAccounts();        

        await this.getChallenge()
        await this.signChallenge()
        await this.verifySignature()

        this.setState({
            loading: false,
        });
    };

    render() {
        return (
            <div className="metamask-div">
                <button className="Login-button Login-mm" onClick={this.handleClick}>
                    {this.state.loading ? 'Loading...' : (this.state.accounts !== null ? this.state.accounts[0] : 'Login with MetaMask')}
                </button>
                <button className="Login-button Login-mm" onClick={this.example}>
                    Example
                </button>
            </div>
        );
    }
}

export default Metamask;