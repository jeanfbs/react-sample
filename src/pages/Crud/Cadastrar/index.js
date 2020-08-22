import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../../store/ducks/auth";
import { alertActions }  from "../../../store/ducks/alert";
import { establishmentActions } from '../../../store/ducks/establishment';
import NumberFormat from 'react-number-format';
import {
    Container,
    Card,
    Tooltip,
    Col,
    OverlayTrigger,
    Button,
    Form,
    InputGroup,
    ButtonToolbar
} from 'react-bootstrap';
import {
    FaStoreAlt,
    FaQuestionCircle,
    FaEdit,
    FaTimes,
    FaCheck,
    FaCaretRight,
    FaAt,
    FaCalendarAlt,
    FaPhone
} from "react-icons/fa";
import FormDataSetter from "../../../utils/FormDataSetter";
import FieldValidator from "../../../validators/FieldValidator";
import { ButtonState } from "../../../components";


class CrudCadastrar extends Component {


    constructor(props){
        super(props);
        this.authService = props.providers.authService;
        this.apiResponseResolver = props.providers.apiResponseResolver;
        this.establishmentService = props.providers.establishmentService;
        this.formRefs = React.createRef();
    }

    state = {
        validated: true,
        processing: false,
        enableForm: false,
        formData: { 
            socialReason: { },
            cnpj: { },
            fantasyName: { },
            ec: { },
            mcc: { },
            legalNature : { },
            joinDate: { },
            cnae: { },
            phone: { },
            email: { },
            whiteList: {}
        }
    }

    componentWillMount = async () => {
        
        // const { banks } = await this.cadastralDetailsService.getBanks();

        // const options = banks.map(item => this.mapToOption(item));
        // this.setState({ items: options });
        
    }

    enableForm = () => {
        this.setState({ enableForm: !this.state.enableForm });
    }

    mapToOption = item => {
        return {
            value: item.id,
            label: item.name
        }
    }

    onBlurField = event => {
        
        const { formData } = this.state;
        let validated = this.formValidate(formData);

        this.setState({ 
            formData: FieldValidator.validate(event, formData),
            validated: validated
        });
    }

    formValidate = (formData) => {
        let validated = false;
        Object.entries(formData).map( attributeValue => {
            validated = validated && attributeValue.validated;
        });
        return validated;
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

    addTextDangerClassAttribute = validated =>  {
        const { enableForm } = this.state;
        return validated === false && enableForm ? 'text-danger' : '';
    }

    addInvalidInputClassAttribute = validated => {
        const { enableForm } = this.state;
        console.log(validated);
        return validated === false && enableForm ? 'is-invalid text-danger' : '';
    }

    hideInvalidFeedBack = validated => validated === false ? '' : 'd-none'
        

    render = () => {

        const { formData, processing, enableForm, validated } = this.state;
        
        return (
            <div>
                <Container fluid>
                    <br />
                    <Card border="secondary" className="card-1">
                        <Card.Header className="bg-primary text-white">
                            <span><FaStoreAlt  className="icon"/> Cadastrar Novo Registro</span>
                            <span className="float-right">
                                <OverlayTrigger
                                    key={'enableForm'}
                                    overlay={
                                        <Tooltip id={`tooltip-enable-form`}>
                                        Editar Formulário
                                        </Tooltip>
                                }>
                                    <a className="ml-3" onClick={ this.enableForm } style={{cursor: 'pointer'}} ><FaEdit  className="icon icon-help"/></a>    
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key={'help'}
                                    overlay={
                                        <Tooltip id={`tooltip-help`}>
                                        Ajuda
                                        </Tooltip>
                                }>
                                    <Link to="#help" className="ml-3"><FaQuestionCircle  className="icon icon-help"/></Link>    
                                </OverlayTrigger>
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Form ref={ this.formRefs } key={'formData'} onSubmit={ this.submitHandler } >
                                <fieldset>
                                    <legend className="text-primary">
                                        <FaCaretRight /> Informações Gerais
                                    </legend>
                                    <Form.Row>
                                        <Form.Group as={ Col } controlId="formSocialReason">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.socialReason.validated)}>* Razão Social</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.socialReason.validated)} 
                                                type="text" disabled={ !enableForm } readOnly={ !enableForm }  
                                                name="socialReason"
                                                required
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler( event, formData ) }) } 
                                                value={ formData.socialReason.value || '' }/>
                                            <div className={"invalid-feedback " + ( this.hideInvalidFeedBack(formData.socialReason.validated ))}>Campo obrigatório</div>
                                        </Form.Group>

                                        <Form.Group as={ Col } controlId="formCnpj">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.cnpj.validated)}>* CNPJ</Form.Label>
                                            <NumberFormat customInput={ Form.Control }  
                                                className={ this.addInvalidInputClassAttribute(formData.cnpj.validated)}
                                                format="##.###.###/####-##" mask="_" 
                                                disabled={ !enableForm } readOnly={ !enableForm } 
                                                required name="cnpj" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.cnpj.value || '' }
                                            />
                                            <div className={"invalid-feedback " + ( formData.cnpj.validated === false  && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={ Col } controlId="formFantasyName">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.fantasyName.validated)}>* Nome Fantasia</Form.Label>
                                            <Form.Control type="text" 
                                                className={this.addInvalidInputClassAttribute(formData.fantasyName.validated)}
                                                disabled={ !enableForm } readOnly={ !enableForm } 
                                                required name="fantasyName" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.fantasyName.value || '' }/>
                                            <div className={"invalid-feedback " + ( formData.fantasyName.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>

                                        <Form.Group as={ Col } controlId="formEc">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.ec.validated)}>* Código da Loja</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.ec.validated)} 
                                                type="text" disabled={ !enableForm } 
                                                readOnly={ !enableForm } required name="ec" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.ec.value || '' }
                                            />
                                            <div className={"invalid-feedback " + ( formData.ec.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                    </Form.Row>
                                </fieldset>
                                <fieldset>
                                    <legend className="text-primary"> <FaCaretRight />Tipo de Atividade</legend>
                                    <Form.Row>
                                        <Form.Group as={ Col } controlId="formMcc">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.mcc.validated)}>* MCC - Ramo de Atividade</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.mcc.validated)} type="text" 
                                                disabled={ !enableForm } readOnly={ !enableForm } required name="mcc" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.mcc.value || '' }
                                            />
                                            <div className={"invalid-feedback " + ( formData.mcc.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                        <Form.Group as={ Col } controlId="formLegalNature">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.legalNature.validated)} >* Natureza Jurídica</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.legalNature.validated)} 
                                            type="text" disabled={ !enableForm } readOnly={ !enableForm } required name="legalNature" 
                                            onBlur={ event => this.onBlurField(event, formData) }
                                            onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                            value={ formData.legalNature.value || '' }
                                            />
                                            <div className={"invalid-feedback " + ( formData.legalNature.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={ Col } controlId="formJoinDate">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.joinDate.validated)} >* Data de Afiliação</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control className={this.addInvalidInputClassAttribute(formData.joinDate.validated)} 
                                                    type="date" disabled={ !enableForm } readOnly={ !enableForm } required name="joinDate" 
                                                    onBlur={ event => this.onBlurField(event, formData) }
                                                    onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                    value={ formData.joinDate.value || '' }
                                                />
                                                <div className={"invalid-feedback " + ( formData.joinDate.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={ Col } controlId="formCnae">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.cnae.validated)}>* CNAE</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.cnae.validated)} style={{ resize:'none' }} 
                                                as="textarea" rows="3" disabled={ !enableForm } readOnly={ !enableForm } required name="cnae" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.cnae.value || '' }
                                            />
                                            <div className={"invalid-feedback " + ( formData.cnae.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                    </Form.Row>
                                </fieldset>
                                <fieldset>
                                    <legend className="text-primary"> <FaCaretRight />Outros</legend>
                                    <Form.Row>
                                        <Form.Group as={ Col } controlId="formPhone">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.phone.validated)}>Telefone Principal</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <NumberFormat customInput={ Form.Control} 
                                                    className={this.addInvalidInputClassAttribute(formData.phone.validated)}
                                                    type="tel" format="(##) ####-####" mask="_" disabled={ !enableForm } 
                                                    readOnly={ !enableForm } name="phone" 
                                                    onBlur={ event => this.onBlurField(event, formData) }
                                                    onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                    value={ formData.phone.value || '' }
                                                />
                                                <div className={"invalid-feedback " + ( formData.phone.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                            </InputGroup>
                                            
                                        </Form.Group>

                                        <Form.Group as={ Col } controlId="formEmail">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.email.validated)}>E-Mail Principal</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control className={this.addInvalidInputClassAttribute(formData.email.validated)} 
                                                    type="email" disabled={ !enableForm } readOnly={ !enableForm } name="email" 
                                                    onBlur={ event => this.onBlurField(event, formData) }
                                                    onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                    value={ formData.email.value || '' }
                                                />
                                                <div className={"invalid-feedback " + ( formData.email.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={ Col } sm={ 6 } controlId="formWhiteList">
                                            <Form.Label className={this.addTextDangerClassAttribute(formData.socialReason.validated)}>Presente na White List</Form.Label>
                                            <Form.Control className={this.addInvalidInputClassAttribute(formData.socialReason.validated)} 
                                                as="select" disabled={ !enableForm } readOnly={ !enableForm } name="whiteList" 
                                                onBlur={ event => this.onBlurField(event, formData) }
                                                onChange={ event => this.setState({ formData: FormDataSetter.onChangeHandler(event, formData) }) } 
                                                value={ formData.whiteList.value || '' }
                                            >
                                                <option value="S">Sim</option>
                                                <option value="N">Não</option>
                                            </Form.Control>
                                            <div className={"invalid-feedback " + ( formData.cnae.validated === false && enableForm ? '' : 'd-none' )}>Campo obrigatório</div>
                                        </Form.Group>
                                    </Form.Row>
                                    <hr />
                                    <Form.Row >
                                        <Col sm={12} >
                                            <ButtonToolbar className="float-right">
                                                <Button className={ "btn-tool " + ( enableForm ? '' : 'd-none') } variant="outline-secondary" type="button" onClick={ event => this.enableForm(false) }> <FaTimes /> Cancelar </Button>
                                                <ButtonState variant="outline-primary" type="submit"  className={ "btn-tool " + ( enableForm ? '' : 'd-none') } disabled={ !validated } loading={ processing } label={<span><FaCheck /> Salvar</span>} />
                                            </ButtonToolbar>
                                        </Col>
                                    </Form.Row>
                                </fieldset>
                            </Form> 
                        </Card.Body>
                    </Card>
                    <br />
                </Container>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...authActions,
        ...establishmentActions,
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    auth: state.auth,
    alert: state.alert,
    ec: state.ec
});

export default connect(mapStateToProps, mapDispatchToProps)(CrudCadastrar);