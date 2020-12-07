import React from 'react'
import RefLinkimg from "../../Images/Referral/RefLink.svg"
import InvYourFriendsimg from "../../Images/Referral/InvYourFriends.svg"
import Cryptoimg from "../../Images/Referral/Crypto.svg"

export class WindowReferral extends React.Component {
    render() {
        let imgs = [
            { image: RefLinkimg, top: '1.Get referral link', data: 'Register and get your unique referral link and code', prop: 'Referral Link', id: 0 },
            { image: InvYourFriendsimg, top: '2.Invite Your Friends', data: 'Invite your friends to register via your link or code', prop: 'Invite Your Friends', id: 1 },
            { image: Cryptoimg, top: '3.Earn Crypto Together', data: 'You will receive up to $2,000 USD when your friends stake BBI on Beluga Exchange', prop: 'Earn Crypto', id: 2 }
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
                        <RefInstructions key={data.id} image={data.image} top={data.top} data={data.data} />
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
                <img src={this.props.image} style={{ width: "100%" }} alt={this.props.top} />
                <div className="vertical-grid">
                    <p className="heading3 text no-space" style={{ fontSize: "10px" }}>{this.props.top}</p>
                    <p className="heading3 text no-space" style={{ fontSize: "8px" }}>{this.props.data}</p>
                </div>
            </div>
        )
    }
}
