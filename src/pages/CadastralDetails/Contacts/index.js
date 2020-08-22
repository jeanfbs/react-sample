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
    Badge
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
    FaAt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState, Switch, ConfirmModal } from "../../../components";
import Utils from "../../../utils/FormDataSetter";



class Contacts extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    
    state = {
        type: true,
        enableForm: false,
        processing: false,
        showConfirmDialog: false,
        formData: {}
    }
    
    setMain = value =>{
        const { formData } = this.state;
        formData.isMain = value[0];
        this.setState({ formData });
    }

    enableForm = status => {
        if(!status){
            this.setState({ formData: {} });
        }
        this.setState({ enableForm: status });
    };


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
            const { message } = await this.cadastralDetailsService.removeContact(formData.cnpj);
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
            const { message }  = await this.cadastralDetailsService.saveContact(formData);
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
            processing, 
            validated,
            showConfirmDialog
        } = this.state;

        const { contacts } = this.props;

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
                            <legend className="text-primary"><FaCaretRight /> Informações do Contato</legend>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="isMain">
                                    <Switch  id="isMain" label="Contato Principal" name="isMain" onChange={ this.setMain } checked={ formData.isMain }/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formName">
                                    <Form.Label>* Nome</Form.Label>
                                    <Form.Control type="text" disabled={ !enableForm } required name="name" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.name || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
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
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } controlId="formPhone">
                                    <Form.Label>Telefone</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" disabled={ !enableForm } name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formCell">
                                    <Form.Label>* Celular</Form.Label>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaMobileAlt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat customInput={ Form.Control } type="tel" format="+55 (##) #####-####" mask="_" disabled={ !enableForm } required name="cell" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.cell || '' }/>
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
                    <Col sm={12}>
                        <Table striped hover responsive >
                            <caption>
                                Tabela de Contatos
                                    <Button size={"xs"} className={"float-right " + (!enableForm ? '' : 'd-none')} variant="outline-dark" type="button" onClick={event => this.enableForm(true)}> <FaUserPlus /> Novo Contato </Button>
                            </caption>
                            <thead>
                                <tr>
                                    <th>Contato</th>
                                    <th>Email</th>
                                    <th>Telefone Fixo</th>
                                    <th>Telefone Celular</th>
                                    <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((item, index) =>
                                    <ContactItem
                                        key={index}
                                        loadToForm={event => this.loadToForm(item)}
                                        showConfirmDialog={event => this.loadToRemove(item)}
                                        item={item}
                                    />)
                                }
                                <tr className={processing === false && (contacts === null || contacts.length === 0) ? '' : 'd-none'}>
                                    <td colSpan="9" className="text-center"> Nenhum resultado a ser exibido</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <ConfirmModal 
                    show={ showConfirmDialog } 
                    message="Deseja remover esse contato?"
                    onHide={ event => this.setState({ showConfirmDialog: false }) } 
                    onCancel={ event => this.setState({ showConfirmDialog: false }) } 
                    onConfirm={ this.onConfirmRemove } 
                />
            </>
        )
    }
}
const ContactItem = props => (
    <tr className={ props.item.isMain ? 'text-primary font-weight-bold border-primary border': ''}>
        <td>{ props.item.name } {  props.item.isMain ? <Badge variant="primary" className="float-right">Principal</Badge>: ''}</td>
        <td>{ props.item.email }</td>
        <td>{ props.item.phone }</td>
        <td>{ props.item.cell }</td>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);