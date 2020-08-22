import React, { Component } from 'react';
import {
    Button
} from 'react-bootstrap';
import Spinner from "../Spinner";

export default class ButtonState extends Component {
    render = () => {

        let onClick = this.props.onClick != null ? this.props.onClick: null
        return (
            <Button className={ this.props.className }  
            onClick={ onClick } 
            variant={ this.props.variant } 
            block={ this.props.block } 
            type={ this.props.type } 
            disabled={ this.props.loading || this.props.disabled }>
                <Spinner variant={ this.props.spinner != null ? this.props.spinner : 'dark' } width="15" height="15" 
                    loading={ this.props.loading } /> { !this.props.loading ? this.props.label : '' }
            </Button>
        )
    }
}
