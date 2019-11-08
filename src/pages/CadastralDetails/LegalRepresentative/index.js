import React, { Component } from 'react';
import {
    Form,
    Col,
    ButtonToolbar,
    Button,
    InputGroup
} from 'react-bootstrap';
import { 
    FaEdit,
    FaTimes,
    FaCheck,
    FaCaretRight,
    FaAt,
    FaCalendarAlt,
    FaPhone,
    FaMobileAlt
} from "react-icons/fa";
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState, CepInput, SelectState } from "../../../components";
import Utils from "../../../utils/Utils";
import FormValidator from "../../../validators/FormValidator";

const initForm = {
    address:{ }
}
class LegalRepresentative extends Component {
    
    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        validated: false,
        processing: false,
        enableForm: false,
        formData: this.props.legalRepresentative != null ? {...this.props.legalRepresentative} : initForm
    }

    submitHandler = async submitEvent =>{
        
        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid });
        
        let formData = this.state.formData;
        this.setState({ processing: true });
        
        try{
            const{ message }  = await this.cadastralDetailsService.saveLegalRepresentative(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false, enableForm: false });
        }
        
    }

    onBlur = address => {

        const { formData } = this.state;
        address.uf = formData.uf;
        formData.address = { ...address };
        this.setState({ formData });
    }

    enableForm = status =>{
        if(!status){
            this.setState({ formData: {...this.props.legalRepresentative} });
        }
        this.setState({ enableForm: status });
    }

    render = () => {
        const { 
            formData, 
            validated, 
            enableForm, 
            processing 
        } = this.state;

        return (
            <Form key={'formData'}
                validated={ validated }
                onSubmit={ this.submitHandler }
                noValidate
                >
                <fieldset>
                    <legend className="text-primary">
                        <FaCaretRight /> Informações Pessoais
                        <Button size={"xs"}  className={ "float-right " + ( !enableForm ? '' : 'd-none') } variant="outline-dark" type="button" onClick={ event => this.enableForm(true) }> <FaEdit /> Editar </Button>
                    </legend>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formName">
                            <Form.Label>* Nome</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } required name="name" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.name || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={ Col } controlId="formEmail">
                            <Form.Label>* E-Mail</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="email" plaintext={ !enableForm } readOnly={ !enableForm } required name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || '' }/>
                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formBirthDate">
                            <Form.Label>* Data de Nascimento</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="date" plaintext={ !enableForm } readOnly={ !enableForm } required name="birthDate" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.birthDate || '' }/>
                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formPaper">
                            <Form.Label>* Papel</Form.Label>
                            <Form.Control as="select" plaintext={ !enableForm } readOnly={ !enableForm } required name="paper" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.paper || '' }>
                                <option value="Procurador">Procurador</option>
                                <option value="Representante Legal">Representante Legal</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group  sm={ 6 } as={ Col } controlId="formCpf">
                            <Form.Label>* CPF</Form.Label>
                            <NumberFormat customInput={ Form.Control } format="###.###.###-##" mask="_" plaintext={ !enableForm } readOnly={ !enableForm } required name="cpf" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cpf || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={ Col } sm={ 2 } controlId="formDocument" className={ enableForm ? '' : 'd-none' }>
                            <Form.Label>Documento</Form.Label>
                            <Form.Control as="select"  name="document" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.document || '' }>
                                <option value="RG">RG</option>
                                <option value="CHN">CNH</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={ Col } sm={  enableForm ? 4: 6 } controlId="formCnh">
                            <Form.Label>* { formData.document || 'CNH' }</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="cnh" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cnh || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </fieldset>
                <fieldset>
                    <legend className="text-primary"> <FaCaretRight />Endereço</legend>
                    <Form.Row>
                        <CepInput 
                            customInput={ Form.Control } 
                            sm={ 6 } 
                            format="##.###-###" 
                            mask="_" 
                            plaintext={ !enableForm }
                            disabled={ !enableForm }
                            name="address.cep"
                            onBlur={ this.onBlur }
                            onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } 
                            value={ formData.address.cep || '' }
                        />
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formStreet">
                            <Form.Label>* Logradouro</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="address.street" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.street || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formDistrict">
                            <Form.Label>* Bairro</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="address.district" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.district || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        
                        <Form.Group as={ Col } controlId="formCity">
                            <Form.Label>* Cidade</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="address.city" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.city || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={ Col }  controlId="formUf">
                            <Form.Label>* UF</Form.Label>
                            <SelectState name="address.uf" disabled={ !enableForm } onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={formData.address.uf || ''} />
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </fieldset>
                <fieldset>
                    <legend className="text-primary"> <FaCaretRight />Outros</legend>
                    <Form.Row>
                        <Form.Group as={ Col } sm={ 6 } controlId="formMother">
                            <Form.Label>* Nome da Mãe</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="mother" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.mother || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formPhone">
                            <Form.Label>Telefone</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <NumberFormat customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" plaintext={ !enableForm } readOnly={ !enableForm } name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formCell">
                            <Form.Label>* Celular</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text > <FaMobileAlt /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <NumberFormat customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" plaintext={ !enableForm } readOnly={ !enableForm } required name="cell" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cell || '' }/>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } sm={ 6 } controlId="formSex">
                            <Form.Label>* Sexo</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } name="sex" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.sex || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <hr />
                    <Form.Row >
                        <Col sm={12} >
                            <ButtonToolbar className="float-right">
                                <Button className={ "btn-tool " + ( enableForm ? '' : 'd-none') } variant="outline-secondary" type="button" onClick={ event => this.enableForm(false) }> <FaTimes /> Cancelar </Button>
                                <ButtonState variant="outline-primary" type="submit" className={ "btn-tool " + ( enableForm ? '' : 'd-none') } loading={ processing } label={<span><FaCheck /> Salvar</span>} />
                            </ButtonToolbar>
                        </Col>
                    </Form.Row>
                </fieldset>
            </Form>
        )
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(LegalRepresentative);