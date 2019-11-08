import React, { Component } from 'react'
import {
    Button,
    Modal
} from 'react-bootstrap';
import { ButtonState } from "../";

export default class ConfirmModal extends Component {
    
    state = {
        processing: false
    }

    confirm = async event => {
        event.preventDefault();
        this.setState({ processing: true });
        await this.props.onConfirm();
        this.setState({ processing: false });
    }

    render = () => {

        const { show, title, message, onHide, onCancel } = this.props;

        const { processing } = this.state;

        return (
            <>
            <Modal show={ show } onHide={ onHide } >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{ title == null ? 'Confirmar Exclusão': title }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                <Button variant="outline-secondary" onClick={ onCancel }>
                    Não
                </Button>
                <ButtonState variant="outline-primary" type="button" onClick={ this.confirm } loading={ processing } label="Sim" />
                </Modal.Footer>
            </Modal>
        </>
        )
    }
}

