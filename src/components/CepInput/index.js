import React, { Component } from 'react'
import {
    Form,
    Col,
    InputGroup,
    Row
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
        if(event.target.value !== ''){
            let address = await this.cepApi.findAddressByCep(event);
            this.props.onBlur(address)
        }
        this.setState({  loading: false });    
    }

    render = () => {

        const { disabled, plaintext, name, onChange, value, required, sm, type} = this.props;
        const { loading } = this.state;
        
        return (
            <>
                {
                    type === 'inline' ? 
                    <InlineCepInput 
                        key="inlineCep"
                        plaintext={ plaintext }
                        disabled={ disabled }
                        name={ name }
                        required={ required }
                        onBlur={ this.onBlur }
                        onChange={ onChange }
                        value={ value }
                        loading={ loading }
                        sm={ sm }
                    /> :
                    <HorizontalCepInput 
                        key="horizontalCep"
                        plaintext={ plaintext }
                        disabled={ disabled }
                        name={ name }
                        required={ required }
                        onBlur={ this.onBlur }
                        onChange={ onChange }
                        value={ value }
                        loading={ loading }
                        sm={ sm }
                    />
                }
            </>
        )
    }
}



const InlineCepInput = (props) => 
<Form.Group as={ Col } sm={ props.sm } controlId="formCep">
    <Form.Label>* CEP</Form.Label>
    <InputGroup className="mb-3">
        <NumberFormat 
            customInput={ Form.Control } 
            format="##.###-###" 
            mask="_" 
            plaintext={ props.plaintext } 
            disabled={ props.disabled } 
            name={ props.name } 
            required={ props.required }
            onBlur={ props.onBlur }
            onChange={ props.onChange } 
            value={ props.value }
        />
        <InputGroup.Append className={ props.plaintext ? 'd-none': ''}>
            <InputGroup.Text className={ "spinner-input " + (props.disabled ? 'spinner-input-disabled' : '') }> 
                <Spinner className={ props.loading ? '' : 'd-none' } variant="dark" width="20" height="20" loading={ props.loading } />
            </InputGroup.Text>
        </InputGroup.Append>
        <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
    </InputGroup>
</Form.Group>

const HorizontalCepInput = (props) => 
<Form.Group as={ Row } controlId="formCep">
    <Form.Label  column sm="3" className="text-right">* CEP</Form.Label>
    <Col sm={ props.sm }>
        <InputGroup className="mb-3">
            <NumberFormat 
                customInput={ Form.Control } 
                format="##.###-###" 
                mask="_" 
                plaintext={ props.plaintext } 
                disabled={ props.disabled } 
                name={ props.name } 
                required={ props.required }
                onBlur={ props.onBlur }
                onChange={ props.onChange } 
                value={ props.value }
            />
            <InputGroup.Append className={ props.plaintext ? 'd-none': ''}>
                <InputGroup.Text className={ "spinner-input " + (props.disabled ? 'spinner-input-disabled' : '') }> 
                    <Spinner className={ props.loading ? '' : 'd-none' } variant="dark" width="20" height="20" loading={ props.loading } />
                </InputGroup.Text>
            </InputGroup.Append>
            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
        </InputGroup>
    </Col>
</Form.Group>