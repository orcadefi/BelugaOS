import React from 'react';
import DropdownMenu from './DropdownMenu'
import "../Casscade style-sheet/Components.css"
import BelugaPayIcon from "../Images/BelugaPayIcon.svg"

class TopBar extends React.Component {
    render() {
        return (
            <div class="topbar-div">
                <div>
                    <img src={BelugaPayIcon} alt="logo" class="topbar-logo" />
                </div>
                <div>
                    <label class="text topbar-label"> Beluga OS</label>
                </div>
                <div>
                    <label class="text topbar-label topbar-no-button">File</label>
                </div>
                <div>
                    <label class="text topbar-label topbar-no-button">Edit</label>
                </div>
                <div>
                    <label class="text topbar-label topbar-no-button">View</label>
                </div>
                <div>
                    <label class="text topbar-label topbar-no-button">Help</label>
                </div>
                <DropdownMenu imgcurrency={this.props.imgcurrency} alt={this.props.currencyalt} currency={this.props.currency}/>
            </div>
        );
    }
}

export default TopBar;