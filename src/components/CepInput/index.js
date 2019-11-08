import React, { Component } from 'react'
import {
    Form,
    Col,
    InputGroup
} from 'react-bootstrap';
import { CepClientApi } from "../../services";
import NumberFormat from 'react-number-format';
import { Spinner } from "../../components";
import "./style.css";

export default class CepInput extends Component {
    
    constructor(props) {
        super(props);
        this.cepApi = new CepClientApi();
    }


    state = {
        loading: false
    }

    onBlur = async event => {
        event.preventDefault();
        this.setState({ loading: true });
        let address = await this.cepApi.findAddressByCep(event);
        this.props.onBlur(address)
        this.setState({  loading: false });    
    }

    render = () => {

        const { disabled, plaintext, name, onChange, value, required, sm } = this.props;
        const { loading } = this.state;

        return (
            <Form.Group as={ Col } sm={ sm } controlId="formCep">
                <Form.Label>* CEP</Form.Label>
                <InputGroup className="mb-3">
                    <NumberFormat 
                        customInput={ Form.Control } 
                        format="##.###-###" 
                        mask="_" 
                        plaintext={ plaintext } 
                        disabled={ disabled } 
                        name={ name } 
                        required={ required }
                        onBlur={ this.onBlur }
                        onChange={ onChange } 
                        value={ value }
                    />
                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                    <InputGroup.Append className={ plaintext ? 'd-none': ''}>
                        <InputGroup.Text className={ "spinner-input " + (disabled ? 'spinner-input-disabled' : '') }> 
                            <Spinner className={ loading ? '' : 'd-none' } variant="dark" width="20" height="20" loading={ loading } />
                        </InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
            </Form.Group>
        )
    }
}
