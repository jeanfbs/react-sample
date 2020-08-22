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
    FaPhone
} from "react-icons/fa";
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState } from "../../../components";
import Utils from "../../../utils/FormDataSetter";

class Details extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        validated: false,
        processing: false,
        enableForm: false,
        formData: this.props.details != null ? {...this.props.details}: { }
    }

    enableForm = status =>{
        if(!status){
            this.setState({ formData: {...this.props.details} });
        }
        this.setState({ enableForm: status });
    }

    submitHandler = async submitEvent =>{
        
        let formData = this.state.formData;
        this.setState({ processing: true });
        
        try{
            const{ message }  = await this.cadastralDetailsService.saveDetails(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false, enableForm: false });
        }
        
    }

    

    render = () => {
        const { formData, enableForm, processing } = this.state;

        return (
            <Form key={'formData'}
                validated={ this.state.validated }
                onSubmit={ this.submitHandler }
                noValidate
                >
                <fieldset>
                    <legend className="text-primary">
                        <FaCaretRight /> Informações Gerais
                        <ButtonToolbar className="float-right">
                            <Button size={"xs"} className={ "btn-tool " + ( !enableForm ? '' : 'd-none') } variant="outline-primary" type="button"> Enviar Senha 1° Acesso</Button>
                            <Button size={"xs"} className={ "btn-tool " + ( !enableForm ? '' : 'd-none') } variant="outline-dark" type="button" onClick={ event => this.enableForm(true) }> <FaEdit /> Editar </Button>
                        </ButtonToolbar>
                    </legend>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formSocialReason">
                            <Form.Label>* Razão Social</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } required name="socialReason" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.socialReason || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={ Col } controlId="formCnpj">
                            <Form.Label>* CNPJ</Form.Label>
                            <NumberFormat customInput={ Form.Control }  format="##.###.###/####-##" mask="_" plaintext readOnly required name="cnpj" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cnpj || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formFantasyName">
                            <Form.Label>* Nome Fantasia</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } required name="fantasyName" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.fantasyName || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={ Col } controlId="formEc">
                            <Form.Label>* Código da Loja</Form.Label>
                            <Form.Control type="text" plaintext readOnly required name="ec" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.ec || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </fieldset>
                <fieldset>
                    <legend className="text-primary"> <FaCaretRight />Tipo de Atividade</legend>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formMcc">
                            <Form.Label>* MCC - Ramo de Atividade</Form.Label>
                            <Form.Control type="text" plaintext readOnly required name="mcc" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.mcc || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formLegalNature">
                            <Form.Label>* Natureza Jurídica</Form.Label>
                            <Form.Control type="text" plaintext={ !enableForm } readOnly={ !enableForm } required name="legalNature" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.legalNature || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formJoinDate">
                            <Form.Label>* Data de Afiliação</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="date" plaintext={ !enableForm } readOnly={ !enableForm } required name="joinDate" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.joinDate || '' }/>
                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={ Col } controlId="formCnae">
                            <Form.Label>* CNAE</Form.Label>
                            <Form.Control style={{ resize:'none' }} as="textarea" rows="3" plaintext readOnly required name="cnae" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cnae || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </fieldset>
                <fieldset>
                    <legend className="text-primary"> <FaCaretRight />Outros</legend>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formPhone">
                            <Form.Label>Telefone Principal</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <NumberFormat customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" plaintext={ !enableForm } readOnly={ !enableForm } name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                            </InputGroup>
                            
                        </Form.Group>

                        <Form.Group as={ Col } controlId="formEmail">
                            <Form.Label>E-Mail Principal</Form.Label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend className={ !enableForm ? 'd-none' : '' }>
                                <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="email" plaintext={ !enableForm } readOnly={ !enableForm } name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || '' }/>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } sm={ 6 } controlId="formWhiteList">
                            <Form.Label>Presente na White List</Form.Label>
                            <Form.Control as="select" plaintext={ !enableForm } disabled={ !enableForm } name="whiteList" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.whiteList || '' }>
                                <option value="S">Sim</option>
                                <option value="N">Não</option>
                            </Form.Control>
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
    }
}



const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);