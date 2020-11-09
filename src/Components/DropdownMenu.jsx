import React from 'react';
import "../Casscade style-sheet/Components.css"
/* Importar Imagen de flechas */

class DropdownMenu extends React.Component {
    render() {
        return (
            <div class="ddm-div">
                <div class="ddm-div-label">
                    <img class="ddm-img" src={this.props.imgcurrency} alt={this.props.alt}></img>
                    <label class="text ddm-label">{this.props.currency}</label>
                </div>
                <div class="div-triangulo">
                    <div class="triangulo-down"></div>
                </div>
            </div>
        );
    }
}

export default DropdownMenu;