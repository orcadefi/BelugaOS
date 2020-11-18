import React from 'react';
import "../Casscade style-sheet/Components.css"
import Web3 from 'web3';
var Eth = require('ethjs')


let web3 = Web3 | undefined;
const BACKEND_URL = "http://orcadefi.com"

class Metamask extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            publicAddress: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleSignMessage = this.handleSignMessage.bind(this);
        this.handleAuthenticate = this.handleAuthenticate.bind(this);
        this.submitexample = this.submitexample.bind(this);
    }

    async submitexample(nonce, address) {
        let msgParams = [
            {
              type: 'string',
              name: 'Challenge',
              value: nonce
            }
        ]
        var eth = new Eth(web3.currentProvider)
        let tocons = await eth.signTypedData(msgParams, address).then((data) => { return data })
        console.log(tocons)
        return tocons;
    }

    async handleSignMessage(publicAddress, nonce) {
        try {
            console.log("going to handleSignMessage")
            console.log("nonce: " + nonce)
            console.log("publicAddress: " + publicAddress)
            let msgParams = [
                {
                  type: 'string',
                  name: 'Challenge',
                  value: nonce
                }
            ]
            var eth = new Eth(web3.currentProvider)
            let tocons = await eth.signTypedData(msgParams, publicAddress).then((data) => { return data })
            console.log("holatocons")
            console.log(tocons)
            return tocons;
        } catch (err) {
            throw new Error('You need to sign the message to be able to log in.');
        }
    };


    async handleAuthenticate(publicAddress, signature) {

        console.log("------------")
        console.log(signature)

        return await fetch(
            `https://cors-anywhere.herokuapp.com/${BACKEND_URL}/auth/authorize`, {
            body: `address=${publicAddress}&signature=${signature}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://orcadefi.com/',
                'Referer': 'http://orcadefi.com/'
            },
            method: 'POST',
        }).then((response) => {return response});
    }
    

    async handleClick() {
        const { onLoggedIn } = this.props;

        this.setState({
            loading: true,
        });

        if ((window).ethereum._metamask.isEnabled()) {
            this.setState({
                loading: false,
                publicAddress: (window).ethereum.selectedAddress
            })
            window.alert('MetaMask is already connected.');
            return;
        }

        // Check if MetaMask is installed
        if (!(window).ethereum) {
            this.setState({
                loading: false
            })
            window.alert('Please install MetaMask first.');
            return;
        }

        if (!web3) {
            try {
                // Request account access if needed
                await (window).ethereum.request({ method: 'eth_requestAccounts' });

                // We don't know window.web3 version, so we use our own instance of Web3
                // with the injected provider given by MetaMask
                web3 = new Web3((window).ethereum);
            } catch (error) {
                this.setState({
                    loading: false
                })
                window.alert('You need to allow MetaMask.');
                return;
            }
        }

        const coinbase = await web3.eth.getCoinbase();
        if (!coinbase) {
            this.setState({
                loading: false
            })
            window.alert('Please activate MetaMask first.');
            return;
        }

        const publicAddress = coinbase.toLowerCase();

        // Look if user with current publicAddress is already present on backend
        let challenge = await fetch(
            `https://cors-anywhere.herokuapp.com/${BACKEND_URL}/auth/challenge`, {
            method: 'POST',
            body: `address=${publicAddress}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Access-Control-Allow-Origin': 'http://orcadefi.com/',
                'Referer': 'http://orcadefi.com/'
            }
        }).then((data) => {return data.json()})
        
        let nounce;

        console.log(challenge)

        try {
            nounce = challenge.result.challenge;
        } catch {
            nounce = undefined;
        }
        
        let signature = await this.handleSignMessage(publicAddress, nounce)
        console.log(signature)

        let response = await this.handleAuthenticate(publicAddress, signature)

        console.log({ resp: response })
        let jsondata = response.json().then((data) => { return data })
        console.log({json: jsondata})

        this.setState({
            loading: false,
            publicAddress: publicAddress
        });
    };

    render() {
        return (
            <div className="metamask-div">
                <button className="Login-button Login-mm" onClick={this.handleClick}>
                    {this.state.loading ? 'Loading...' : (this.state.publicAddress !== "" ? this.state.publicAddress : 'Login with MetaMask')}
                </button>
                <button className="Login-button Login-mm" onClick={this.submitexample}>
                    Example
                </button>
            </div>
        );
    }
}

export default Metamask;