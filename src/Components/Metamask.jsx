import React from 'react';
import "../Casscade style-sheet/Components.css"
import Web3 from 'web3';
var Eth = require('ethjs')
var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')

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

    async submitexample() {
        /*
        let hasMsg = ethUtil.keccak256('Hello Alice!')
        let hexString = '28eaa70d49540d4ce392b0695a631b88ecd3fa602c2d5a88ca65d6cabeab50dc'
        let PrivateAddress = Uint8Array.from(Buffer.from(hexString, 'hex'));
        console.log("private ")
        console.log(PrivateAddress)
        let publicAddress = ethUtil.privateToPublic('0x28eaa70d49540d4ce392b0695a631b88ecd3fa602c2d5a88ca65d6cabeab50dc')
        let IsPrivateAddress = ethUtil.isValidPrivate(PrivateAddress)
        console.log("public ")
        console.log(publicAddress)
        
        let temp = {}

        console.log("signing...")
        temp = ethUtil.ecsign(hasMsg, PrivateAddress, 1)
        console.log(temp)
        let uint8 = ethUtil.ecrecover(hasMsg, temp.v, temp.r, temp.s, 1)
        console.log("public recovered ")
        console.log(uint8)
        let data = await this.handleSignMessage("0x3fde3ff18cB3574ca8d8Ca2D4ad6Ec03e8EBd5dF", 'Hello Alice!')
        console.log(data)
        let u8a = Uint8Array.from(Buffer.from('30195c8b40b0989903e653838e5a550c4ae46b6a38e721a39bfec9ad83dc022805e164f5d016827eaf24141030679bbb11b620858153b94f58e962e8e5ea7d201c', 'hex'));
        console.log(u8a)
        */
        
        web3 = new Web3((window).ethereum);
        let addresses = await (window).ethereum.request({ method: 'eth_requestAccounts' });
        let from = addresses[0]
        
        let nonce = "Hello Alice!"
        console.log(nonce)
        

        let msgParams = [
            {
              type: 'string',
              name: 'Challenge',
              value: nonce
            }
        ]
        
        var eth = new Eth(web3.currentProvider)
        let resolve = await eth.signTypedData(msgParams, from).then((data) => { return data })

        const recovered = sigUtil.recoverTypedSignatureLegacy({ data: msgParams, sig: resolve })

        if (ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)) {
          alert('Successfully ecRecovered signer as ' + from)
        } else {
          alert('Failed to verify signer when comparing ' + resolve + ' to ' + from)
        }

        return resolve;
    }

    async handleSignMessage(publicAddress, nonce) {
        web3 = new Web3((window).ethereum);
        try {
            let msgParams = [
                {
                  type: 'string',
                  name: 'Challenge',
                  value: nonce
                }
            ]
            var eth = new Eth(web3.currentProvider)
            let tocons = await eth.signTypedData(msgParams, publicAddress).then((data) => { return data })
            return tocons;
        } catch (err) {
            throw new Error('You need to sign the message to be able to log in.');
        }
    };


    async handleAuthenticate(publicAddress, signature) {

        console.log("------------")
        console.log(signature)

        //signature = web3.utils.hexToUtf8(signature);

        console.log(`address=${publicAddress}&signature=${signature}`)
        return await fetch(
            `https://orcadefi.herokuapp.com/${BACKEND_URL}/auth/authorize`, {
            body: `address=${publicAddress}&signature=${signature}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((response) => {return response.json()});
    }    

    async handleClick() {

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
            `https://orcadefi.herokuapp.com/${BACKEND_URL}/auth/challenge`, {
            method: 'POST',
            body: `address=${publicAddress}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        }).then((data) => {return data.json()})
        
        let nounce;

        console.log(challenge)
        console.log("\"" + challenge.result.challenge + "\"")

        try {
            nounce = challenge.result.challenge;
        } catch {
            nounce = undefined;
        }
        
        let signature = await this.handleSignMessage(publicAddress, nounce)
        console.log(`address=${publicAddress}&signature=${signature}`)

        let response = await this.handleAuthenticate(publicAddress, signature).then((data) => {return data})

        console.log(response)

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