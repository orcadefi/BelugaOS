import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'

export const getWeb3Legacy = () =>
    new Promise((resolve, reject) => {
        let web3 = window.web3;

        if (typeof web3 !== "undefined") {
            web3 = new Web3(web3.currentProvider);
            resolve(web3);
        } else {
            reject("Please make sure MetaMask is installed.");
        }
    });

const getWeb3 = async () => {

    if (window.ethereum !== null && window.ethereum !== undefined) {
        window.ethereum.autoRefreshOnNetworkChange = false;
        return window.ethereum;
    }

    const provider = await detectEthereumProvider()

    if (provider) {
        console.log('Ethereum successfully detected!')
        // From now on, this should always be true:
        // provider === window.ethereum

        // Access the decentralized web!

        // Legacy providers may only have ethereum.sendAsync
        const chainId = await provider.request({
            method: 'eth_chainId'
        })
        console.log(chainId)
        window.ethereum.autoRefreshOnNetworkChange = false;
        return window.ethereum;
    } else {

        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!')
    }
}

export default getWeb3;