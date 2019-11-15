import React, { Component } from 'react';
import {
    Form,
    Col,
    ButtonToolbar,
    Button,
    InputGroup,
    Container,
    Card
} from 'react-bootstrap';
import { 
    FaEdit,
    FaQuestionCircle,
    FaTimes,
    FaCheck,
    FaCaretRight,
    FaAt,
    FaCalendarAlt,
    FaPhone
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState } from "../../../components";
import Utils from "../../../utils/Utils";
import FormValidator from "../../../validators/FormValidator";

class FormExample extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        validated: false,
        processing: false,
        formData: this.props.details != null ? {...this.props.details}: { }
    }

    enableForm = status =>{
        if(!status){
            this.setState({ formData: {...this.props.details} });
        }
        this.setState({ enableForm: status });
    }

    submitHandler = async submitEvent =>{
        
        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid });
        
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
        const { formData, enableForm, processing, validated } = this.state;

        return (
            <Container fluid>
                <Card className="card-1 border-dark">
                    <Card.Header className="bg-primary text-white">
                        <span><FaEdit  className="icon"/> Form Data</span>
                        <span className="float-right">
                            <Link to="#help"><FaQuestionCircle  className="icon icon-help"/></Link>    
                        </span>
                        
                    </Card.Header>
                    <Card.Body className="p-3">
                    <Form key={'formData'}
                        validated={ validated }
                        onSubmit={ this.submitHandler }
                        noValidate
                        >
                        <fieldset>
                            <legend className="text-primary">
                                <FaCaretRight /> Informações Gerais
                            </legend>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formSocialReason">
                                    <Form.Label>* Razão Social</Form.Label>
                                    <Form.Control size="sm" type="text" required name="socialReason" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.socialReason || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } controlId="formCnpj">
                                    <Form.Label>* CNPJ</Form.Label>
                                    <NumberFormat size="sm" customInput={ Form.Control }  format="##.###.###/####-##" mask="_" required name="cnpj" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cnpj || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formFantasyName">
                                    <Form.Label>* Nome Fantasia</Form.Label>
                                    <Form.Control size="sm" type="text" required name="fantasyName" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.fantasyName || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } controlId="formEc">
                                    <Form.Label>* Código da Loja</Form.Label>
                                    <Form.Control size="sm" type="text" required name="ec" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.ec || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                        </fieldset>
                        <fieldset>
                            <legend className="text-primary"> <FaCaretRight />Tipo de Atividade</legend>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formMcc">
                                    <Form.Label>* MCC - Ramo de Atividade</Form.Label>
                                    <Form.Control size="sm" type="text" required name="mcc" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.mcc || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formLegalNature">
                                    <Form.Label>* Natureza Jurídica</Form.Label>
                                    <Form.Control size="sm" type="text" required name="legalNature" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.legalNature || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formJoinDate">
                                    <Form.Label>* Data de Afiliação</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control size="sm" type="date" required name="joinDate" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.joinDate || '' }/>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formCnae">
                                    <Form.Label>* CNAE</Form.Label>
                                    <Form.Control style={{ resize:'none' }} as="textarea" rows="3" required name="cnae" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cnae || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                        </fieldset>
                        <fieldset>
                            <legend className="text-primary"> <FaCaretRight />Outros</legend>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formPhone">
                                    <Form.Label>Telefone Principal</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat size="sm" customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                                    </InputGroup>
                                    
                                </Form.Group>

                                <Form.Group as={ Col } controlId="formEmail">
                                    <Form.Label>E-Mail Principal</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control size="sm" type="email" name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || '' }/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 6 } controlId="formWhiteList">
                                    <Form.Label>Presente na White List</Form.Label>
                                    <Form.Control as="select" size="sm" name="whiteList" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.whiteList || '' }>
                                        <option value="S">Sim</option>
                                        <option value="N">Não</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <hr />
                            <Form.Row >
                                <Col sm={12} >
                                    <ButtonToolbar className="float-right">
                                        <Button className={ "btn-tool " } variant="outline-secondary" type="button" onClick={ event => this.enableForm(false) }> <FaTimes /> Cancelar </Button>
                                        <ButtonState variant="outline-primary" type="submit" className={ "btn-tool " } loading={ processing } label={<span><FaCheck /> Salvar</span>} />
                                    </ButtonToolbar>
                                </Col>
                            </Form.Row>
                        </fieldset>
                    </Form>
                    </Card.Body>
                </Card>
                <br/>
            </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormExample);