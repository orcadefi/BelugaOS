import React from 'react'

export class WindowStaking extends React.Component {
    render() {
        let stakinContainer = [{ data: "45,625", label: "BBI Staked", id: 0 }, { data: "30%", label: "APR", id: 1 }, { data: "7d 24h 60m 60s", label: "Next Payout", id: 2 }]
        let stakingTable = [{a: "32416898", b: "2,65", c: "", id: 0}, {a: "32416897", b: "2,65", c: "", id: 1}, {a: "32416896", b: "2,65", c: "", id: 2}, {a: "32416895", b: "2,65", c: "", id: 3}]
        return (
            <div style={{width: "100%", height: "100%"}}>
                <div style={{top: "23px", position: "relative", display: "grid", gridTemplateColumns: "150px 190px 120px 70px", gridTemplateRows: "1fr", height: "20px" , width: "calc(100% - 46px)", left: "23px"}}>
                    <label className="text" style={{fontSize: "17px", textAlign: "center"}}>Staking Address</label>
                    <div></div>
                    <label className="text" style={{fontSize: "12px", textAlign: "center", paddingTop: "5%"}}>Current Staking</label>
                    <label className="text" style={{fontSize: "20px"}}>30 BBI</label>
                </div>
                <div style={{top: "40px", position: "relative", display: "grid", gridTemplateColumns: "460px 70px", gridTemplateRows: "1fr", height: "20px", width: "calc(100% - 46px)", left: "23px" }}>
                    <input className="text container"></input>
                    <button className= "text activeButton">Copy</button>
                </div>
                <div style={{ top: "60px", position: "relative", display: "grid", gridTemplateColumns: "160px 160px 160px", gridColumnGap: "25px", gridTemplateRows: "1fr", height: "70px", width: "calc(100% - 46px)", left: "23px" }}>
                    {stakinContainer.map((data) =>
                        <div key={data.id} className="text stakingContainer">
                            <label className="text" style={{alignItems: "center", display: "flex", justifyContent: "center", fontSize: "18px"}}>{data.data}</label>
                            <label className="text" style={{alignItems: "center", display: "flex", justifyContent: "center", fontSize: "14px"}}>{data.label}</label>
                        </div>
                    )}
                </div>
                <table className="text BBITable" style={{}}>
                    <thead>
                        <tr>
                            <th>BBI Staking Payouts</th>
                            <th>BBI Earned</th>
                            <th>BBI Staked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stakingTable.map((data) =>
                            <tr key={data.id}>
                                <td>{data.a}</td>
                                <td>{data.b}</td>
                                <td>{data.c}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
