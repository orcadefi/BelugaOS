import React from 'react';
import "../Casscade style-sheet/Components.css"
/* Importar Imagen de flechas */

class DropdownMenu extends React.Component {
    render() {
        return (
            <div className="ddm-div">
                <div className="ddm-div-label">
                    <img className="ddm-img" src={this.props.imgcurrency} alt={this.props.alt}></img>
                    <label className="text ddm-label">{this.props.currency}</label>
                </div>
                <div className="div-triangulo">
                    <div className="triangulo-down"></div>
                </div>
            </div>
        );
    }
}

export default DropdownMenu;