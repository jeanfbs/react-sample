import React, { Component } from 'react'

export default class Switch extends Component {


    render() {
        return (
            <div className={ "custom-control custom-switch " + (this.props.className  || '' )}>
                <input 
                {...this.props}
                type="checkbox" 
                className={ "custom-control-input" } 
                 />
                <label className="custom-control-label" htmlFor={ this.props.id || ''  }>{ this.props.label || ''  }</label>
            </div>
        )
    }
}
