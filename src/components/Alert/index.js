import React, { Component } from 'react'
import { FaCheck, FaExclamationCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
import  { Col, Row, Alert as AlertBootstrap } from 'react-bootstrap/';
import "./style.css";

export default class Alert extends Component {

    state = {
        show: false,
        icon: null
    }

    getIcon = () => {

        let icon = null;
        
        switch(this.props.variant){
            case 'success':
                icon = <FaCheck />;
                break;
            case 'danger':
                icon = <FaExclamationCircle />;
                break;
            case 'warning':
                icon = <FaExclamationTriangle />;
                break;
            default:
                icon = <FaLightbulb />;
                break;
        }
        return icon;
    }

    render() {
        return (
            <AlertBootstrap className={`card-1 border-${this.props.variant}`} show={this.props.show} onClose={ this.props.onClose } dismissible variant={ this.props.variant }>
                <Row className="m-0">
                    <Col sm={1} >
                        <h3 className="align-middle alert-icon">{ this.props.title ? '' : this.getIcon() }</h3>
                    </Col>
                    <Col sm={11}>
                        <p className="text-justify alert-message">  { this.props.message || '' } </p>
                    </Col>
                </Row>
            </AlertBootstrap>
        )
    }
}
