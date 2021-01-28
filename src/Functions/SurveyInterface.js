import Web3 from "web3";
import abi from "./SurveyABI.json";
import getWeb3 from "./getWeb3"

const web3 = new Web3(window.ethereum);

//Remember to change the Address to the mainnet smart contract when deployed
let SurveyAddress = "0xc9f3bD5358bC59e0863E5748B185d9FDe71df79e";
let SurveyContract = new web3.eth.Contract(abi.abi, SurveyAddress);
let account;

export class SurveyInterface {

    getAccounts = async () => {
        await getWeb3();
        try {
            account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (err) {
            console.log(err);
            throw new Error("Plese connect metamask");
        }
    }

    /**
     * @notice This function review if the address has admin access to the SurveyDB
     * @param {string} address Address to check if have admin access
     * @param {integer} level Level of admin access to review
     * @returns {boolean} Returns true if addmin and level are correct
     */
    async isAdmin(address, level) {
        return await SurveyContract.methods.isAdmin(address, level).call();
    }

    /**
     * @notice This function add access to the restricted functions of the Smart contract
     * @param {string} _newAdmin The address to be added
     * @param {integer} level The level of privilege to assign
     * @returns {boolean} Returns true
     */
    async addAdmin(_newAdmin, level) {
        await this.getAccounts();
        return await SurveyContract.methods.addAdmin(_newAdmin, level).send({from: account[0]});
    }

    /**
     * @notice This changes the SurveyDB Smart Contract
     * @param {string} address Address of the new SurveyDB
     */
    async setSurveyDBContract(address) {
        await this.getAccounts();
        return await SurveyContract.methods.setSurveyDBContract(address).send({from: account[0]});
    }

    /**
     * @notice This changes the BBI Token Smart Contract
     * @param {string} address Address of the BBI Token Contract
     */
    async setBBIToken(address) {
        await this.getAccounts();
        return await SurveyContract.methods.setBBIToken(address).send({from: account[0]});
    }

    /**
     * @notice This get all the names of the existent surveys
     */
    async getAllSurveys() {
        let names = await SurveyContract.methods.getAllSurveys().call();
        return names.map(data => {
            return this.bytes32ToString(data);
        })
    }

    /**
     * @notice This functions create a new survey
     * @param {string} name Name of the survey
     * @param {string[]} options Options to vote
     * @param {Date integer} endDate End date of the survey
     * @param {integer} rewardPool Reward Pool of the survey
     */
    async addSurvey(name, options, endDate, rewardPool) {
        await this.getAccounts();
        options = options.map(data => {
            return this.stringToBytes32(data);
        });
        return await SurveyContract.methods.addSurvey(this.stringToBytes32(name), options, endDate, rewardPool).send({from: account[0]});
    }

    /**
     * @notice Add an option to a survey
     * @param {string} surveyName Name of the survey
     * @param {string} surveyOption New option
     */
    async addSurveyOption(surveyName, surveyOption) {
        await this.getAccounts();
        return await SurveyContract.methods.addSurveyOption(surveyName, surveyOption).send({from: account[0]});
    }

    /**
     * 
     * @param {string} surveyName Name of the survey
     * @param {string} sender Sender
     * @param {integer} payoutType Payout type
     */
    async addStakingHistory(surveyName, sender, payoutType) {
        await this.getAccounts();
        return await SurveyContract.methods.addStakingHistory(surveyName, sender, payoutType, Date.now()).send({from: account[0]});
    }

    /**
    * @notice Function to update the survey end date
    * @param {string} surveyName Survey name
    * @param {integer} endDate Survey end date
    */
    async updateSurveyEndDate(surveyName, endDate) {
        await this.getAccounts();
        return await SurveyContract.methods.updateSurveyEndDate(surveyName, endDate).send({from: account[0]});
    }

    /**
    * @notice Function to update the survey reward pool
    * @param {string} surveyName Survey name
    * @param {integer} rewardPool Survey reward pool
    */
    async updateSurveyRewardPool(surveyName, rewardPool) {
        await this.getAccounts();
        return await SurveyContract.methods.updateSurveyRewardPool(surveyName, rewardPool).send({from: account[0]});
    }

    /**
    * @notice Get BBI Token balance
    * @return {integer} balance
    */
    async getBalance() {
        return await SurveyContract.methods.getBalance().call();
    }

    /**
    * @notice Save survey answer and transfer bbi votes
    * @param {string} surveyName Survey name
    * @param {string} participantOption Survey option
    * @param {boolean} typeVote Type of vote, true 'FOR' and false 'AGAINST'
    * @param {integer} typeReward Type reward for the participant
    * @param {integer} dateVoted Date voted
    */
    async saveAnswer(surveyName, participantOption, bbiVote, typeVote, typeReward, participantAddress) {
        await this.getAccounts();
        return await SurveyContract.methods.saveAnswer(this.stringToBytes32(surveyName), this.stringToBytes32(participantOption), bbiVote, typeVote, typeReward, participantAddress, Date.now()).send({from: account[0]});
    }

    /**
    * @notice Send stake
    * @param {string} surveyName Survey name
    * @param {integer} amountStaked Amount staked
    * @param {integer} stakeStartDate Stake start date
    */
    async sendStake(surveyName, amountStaked, sender, stakeStartDate) {
        await this.getAccounts();
        return await SurveyContract.methods.sendStake(this.stringToBytes32(surveyName), amountStaked, sender, Date.now()).send({from: account[0]});
    }

    /**
    * @notice Stop stake
    * @param {string} surveyName Survey name
    * @param {integer} dateStop Date stop stake
    */
    async stopStake(surveyName, sender, dateStop) {
        await this.getAccounts();
        return await SurveyContract.methods.stopStake(this.stringToBytes32(surveyName), sender, Date.now()).send({from: account[0]});
    }

    /**
    * @notice Send user reward
    * @param {string} surveyName Survey name
    * @param {string} participant Address participant
    * @param {integer} reward Reward amount
    * @param {integer} datePayout Date payout
    */
    async sendReward(surveyName, participant, reward, datePayout) {
        await this.getAccounts();
        return await SurveyContract.methods.sendReward(this.stringToBytes32(surveyName), participant, reward, Date.now()).send({from: account[0]});
    }

    /**
    * @notice Return the amount staked to some user that stopped the staking
    * @param {string} sender Address sender
    */
    async returnAmountStaked(address) {
        await this.getAccounts();
        return await SurveyContract.methods.returnAmountStaked(address).send({from: account[0]});
    }

    /**
    * @notice Get survey data
    * @param {string} surveyName Survey name
    * @return {Object} {options Survey options
    *                   open Survey status
    *                   exists The survey exists
    *                   address Owner addres}
    */
    async getSurvey(surveyName) {
        return await SurveyContract.methods.getSurvey(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get total amount staked
    * @return {integer} amountStaked Total amount staked
    */
    async getTotalAmountStacked() {
        return await SurveyContract.methods.getTotalAmountStacked().call();
    }

    /**
    * @notice Get survey reward pool
    * @param {string} surveyName Survey name
    * @return {Object} rewardPool Survey reward pool
    */
    async getSurveyRewardPool(surveyName) {
        return await SurveyContract.methods.getSurveyRewardPool(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get survey staking history
    * @param {string} surveyName Survey name
    * @return {Object} {sender Senders address
    *                   payoutType Payout type by each sender in the same order than the senders
    *                   time Date payout by each sender in the same order than the senders}
    */
    async getSurveyStakingHistory(surveyName) {
        return await SurveyContract.methods.getSurveyStakingHistory(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get amount staked by user
    * @return {integer} amountStaked Amount staked
    */
    async getAmountStaked() {
        return await SurveyContract.methods.getAmountStaked().call();
    }

    /**
    * @notice Get staking info
    * @param {string} surveyName Survey name
    * @return {Object} {stakingActive Staking active status
    *                   stakingActiveDate Stake start date
    *                   amountStaked Amount staked
    *                   rewards Rewards}
    */
    async getStakingInfo(surveyName) {
        return await SurveyContract.methods.getStakingInfo(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get vote info from a specific survey
    * @return {Object} {voted Flag to see if the participant voted
    *                   dateVoted Date voted}
    */
    async getVoteInfo(surveyName) {
        return await SurveyContract.methods.getVoteInfo(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get voted options by specific survey and user
    * @param {string} surveyName Survey name
    * @return {Object[]} votedOptions Voted options
    */
    async getVotedOptions(surveyName) {
        return await SurveyContract.methods.getVotedOptions(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get survey results
    * @param {string} surveyName Survey name
    * @return {Object} {options_ Survey options
    *                   BBIVotesFor_ BBI Votes FOR by each option in the same order than the survey options
    *                   BBIVotesAgainst_ BBI Votes AGAINST by each option in the same order tahn the survey options}
    */
    async getSurveyResult(surveyName) {
        return await SurveyContract.methods.getSurveyResult(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get reward info by survey
    * @param {string} surveyName Survey name
    * @return {Object} {participants Survey participants
    *                   stakingTime Staking time by each participant in the same order than the participants
    *                   reward Reward by each participant in the same order than the participants
    *                   rewarded Flag to see if the participant was rewarded in the same order than the participants
    *                   stakeStatus Flag to see if the participant has staking active in the same order than the participants}
    */
    async getRewardInfo(surveyName) {
        return await SurveyContract.methods.getRewardInfo(this.stringToBytes32(surveyName)).call();
    }

    /**
    * @notice Get participants pending of withdraw the amount staked and if they might do it
    * @param {string} surveyName Survey name
    * @return {Object} {participants Participants pending of withdraw
    *                   pay Flag to see if the participant migh withdraw the amount staked}
    */
    async getParticipantsPendingPayment(surveyName) {
        return await SurveyContract.methods.getParticipantsPendingPayment(this.stringToBytes32(surveyName), Date.now()).call();
    }

    /**
     * @notice Transform string into a valid form of bytes
     * @param {string} x Value to be transformed into Bytes (Hexadecimal)
     */
    stringToBytes32(x) {
        return web3.utils.asciiToHex(x)
    }

    /**
     * @notice Transform bytes (hexadecimal) into string
     * @param {string} x Value to be transformed into string
     */
    bytes32ToString(x) {
        return String(web3.utils.hexToAscii(x)).replace(/[\x00]/g, "");
    }

}

export default SurveyInterface;