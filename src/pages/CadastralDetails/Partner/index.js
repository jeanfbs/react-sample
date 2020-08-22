import React, { Component } from 'react';
import {
    Form,
    OverlayTrigger,
    Tooltip,
    Table,
    Col,
    Row,
    Button,
    ButtonToolbar,
    InputGroup,
    ToggleButtonGroup,
    ToggleButton
} from 'react-bootstrap';
import { 
    FaEdit,
    FaTimesCircle,
    FaTimes,
    FaCheck,
    FaUserPlus,
    FaPhone,
    FaMobileAlt,
    FaCaretRight,
    FaAt,
    FaCalendarAlt,
    FaPercent
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState, ConfirmModal } from "../../../components";
import Utils from "../../../utils/FormDataSetter";
import FieldValidator from "../../../validators/FieldValidator";


class Partner extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        type: true,
        enableForm: false,
        processing: false,
        showConfirmDialog: false,
        formData: { }
    }

    enableForm = status =>{
        if(!status){
            this.setState({ formData: {} });
        }
        this.setState({ enableForm: status });
    }


    loadToForm = partner => {
        let formData = {...partner};
        let type = formData.birthDate != null;
        this.setState({ formData, enableForm: true, type });
        window.scrollTo(0, 200);
    }

    loadToRemove = partner => {
        let formData = {...partner};
        let type = formData.birthDate != null;
        this.setState({ formData, showConfirmDialog: true });
    }


    onConfirmRemove = async () => {

        const { formData } = this.state;
        
        try{
            const { message } = await this.cadastralDetailsService.removePartner(formData.cnpj);
            this.props.alertSuccess(message);
            this.setState({ formData: {} });
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ showConfirmDialog: false });
        }
        
    }


    submitHandler = async submitEvent =>{

        let { formData } = this.state;
        this.setState({ processing: true });
        try{
            const { message }  = await this.cadastralDetailsService.savePartner(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false, enableForm: false });
        }
        
    }

    

    render = () => {

        const { 
            enableForm, 
            formData, 
            type, 
            processing, 
            validated,
            showConfirmDialog
        } = this.state;
        
        const { partners } = this.props;

        return (
            <>
                <Row>
                    <Col sm={ 12 }>
                    <Form key={'formData'}
                        className={ enableForm ? '' : 'd-none' }
                        validated={ validated }
                        onSubmit={ this.submitHandler }
                        noValidate
                        >
                        <fieldset>
                            <legend className="text-primary"><FaCaretRight /> Informações Sócio</legend>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formName">
                                    <Form.Label>Pessoa</Form.Label>
                                    <ButtonToolbar>
                                        <ToggleButtonGroup type="radio" name="type" onChange={ input => this.setState({ type: input }) } value={ type } defaultValue={ true }>
                                            <ToggleButton value={ true }>Física</ToggleButton>
                                            <ToggleButton value={ false }>Jurídica</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formName">
                                    <Form.Label>* Nome</Form.Label>
                                    <Form.Control type="text" disabled={ !enableForm } required name="name" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.name || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formId">
                                    <Form.Label>* { type ? 'CPF' : 'CNPJ'}</Form.Label>
                                    <NumberFormat customInput={ Form.Control } format={ type ? "###.###.###-##" : "##.###.###/####-##"} mask="_" disabled={ !enableForm } required name="id" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.id || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formEmail">
                                    <Form.Label>* E-Mail</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="email" disabled={ !enableForm } required name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || '' }/>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formBirthDate">
                                    <Form.Label>* { type ? 'Data de Nascimento' : 'Data de Constituição'}</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="date" disabled={ !enableForm } required name={ type ? "birthDate" : "constitutionDate"} onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ type ? (formData.birthDate || '') : (formData.constitutionDate || '') }/>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 3 } controlId="formPhone">
                                    <Form.Label>Telefone</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat customInput={ Form.Control } type="tel" format="+55 (##) ####-####" mask="_" disabled={ !enableForm } name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } sm={ 3 } controlId="formCell">
                                    <Form.Label>* Celular</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaMobileAlt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat customInput={ Form.Control } type="tel" format="+55 (##) #####-####" mask="_" disabled={ !enableForm } required name="cell" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cell || '' }/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } sm={ 3 } controlId="formCell">
                                    <Form.Label>* Participação</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaPercent /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat customInput={ Form.Control } allowLeadingZeros={ true } format={ FieldValidator.checkPercentage } disabled={ !enableForm } required name="percent" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.percent || '' }/>
                                    </InputGroup>
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
                    </Col>
                </Row>
                <Row>
                    <Col sm={ 12 }>
                        <Table striped hover responsive style={{ width: '1600px'}}>
                            <caption>
                                Tabela de Sócios
                                <Button size={"xs"} className={ "float-right " + ( !enableForm ? '' : 'd-none') } variant="outline-dark" type="button" onClick={ event => this.enableForm(true) }> <FaUserPlus /> Novo Sócio </Button>
                            </caption>
                            <thead>
                                <tr>
                                    <th>Nome/Razão</th>
                                    <th>CPF/CNPJ</th>
                                    <th>Data de Nascimento/Fundação</th>
                                    <th>Telefone Fixo</th>
                                    <th>Telefone Celular</th>
                                    <th>E-Mail</th>
                                    <th>Percentual</th>
                                    <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                { partners.map( (item, index) => 
                                    <PartnerItem 
                                        key={ index } 
                                        loadToForm={ event => this.loadToForm(item) } 
                                        showConfirmDialog={ event => this.loadToRemove(item) } 
                                        item={ item } 
                                    />) 
                                }
                                <tr className={ processing === false && (partners === null || partners.length === 0) ? '' : 'd-none' }>
                                    <td colSpan="9" className="text-center"> Nenhum resultado a ser exibido</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ConfirmModal 
                    show={ showConfirmDialog } 
                    message="Deseja remover esse socio?"
                    onHide={ event => this.setState({ showConfirmDialog: false }) } 
                    onCancel={ event => this.setState({ showConfirmDialog: false }) } 
                    onConfirm={ this.onConfirmRemove } 
                />
            </>
        )
    }
}

const PartnerItem = props => (
    <tr>
        <td>{ props.item.name }</td>
        <td>{ props.item.id }</td>
        <td>{ props.item.birthDate } </td>
        <td>{ Utils.phoneMask(props.item.phone) }</td>
        <td>{ Utils.cellphoneMask(props.item.cell) }</td>
        <td>{ props.item.email }</td>
        <td>{ parseFloat(props.item.percent).toFixed(2) + " %" }</td>
        <td>
            <OverlayTrigger
                key={"last-edit"}
                placement={"top"}
                overlay={
                    <Tooltip id={`tooltip-last-edit`}>
                        Editar
                    </Tooltip>
                }>
                <Link to="#" onClick={ props.loadToForm } className="actions"> <FaEdit /> </Link>
            </OverlayTrigger>
            <OverlayTrigger
                key={"last-remove"}
                placement={"top"}
                overlay={
                    <Tooltip id={`tooltip-last-remove`}>
                        Remover
                    </Tooltip>
                }>
                <Link to="#" onClick={ props.showConfirmDialog } className="actions"> <FaTimesCircle /> </Link>
            </OverlayTrigger>
            
        </td>
    </tr>
)







const mapDispatchToProps = dispatch =>
bindActionCreators({
    ...alertActions
}, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Partner);