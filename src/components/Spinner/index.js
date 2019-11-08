import React, { Component } from 'react';
import "./style.css";

export default class Spinner extends Component {

    render() {
        return (
            <div id="lds-ring" className={ this.props.className + ' ' + (this.props.loading ? '' : 'd-none') } ><div style={ { width: this.props.width + 'px', height: this.props.height + 'px' } } className={ this.props.variant }></div></div>
        )
    }
}
