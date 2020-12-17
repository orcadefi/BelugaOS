import React from 'react';
import DropdownMenu from './DropdownMenu'
import "../Casscade style-sheet/Components.css"
import OrcaPayIcon from "../Images/Orca.svg"

class TopBar extends React.Component {
    render() {
        return (
            <div className="topbar-div">
                <div>
                    <img src={OrcaPayIcon} alt="logo" className="topbar-logo" />
                </div>
                <div>
                    <label className="text topbar-label"> Orca OS</label>
                </div>
                <div>
                    {/*<label className="text topbar-label topbar-no-button">File</label>*/}
                    <label className="text topbar-label topbar-no-button"></label>
                </div>
                <div>
                    {/*<label className="text topbar-label topbar-no-button">Edit</label>*/}
                    <label className="text topbar-label topbar-no-button"></label>
                </div>
                <div>
                    {/*<label className="text topbar-label topbar-no-button">View</label>*/}
                    <label className="text topbar-label topbar-no-button"></label>
                </div>
                <div>
                    {/*<label className="text topbar-label topbar-no-button">Help</label>*/}
                    <label className="text topbar-label topbar-no-button"></label>
                </div>
                <DropdownMenu imgcurrency={this.props.imgcurrency} alt={this.props.currencyalt} currency={this.props.currency}/>
            </div>
        );
    }
}

export default TopBar;