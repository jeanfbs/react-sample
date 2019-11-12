import React, { Component } from 'react';
import {
    Row,
    Card,
    Col,
    Form,
    ButtonToolbar,
    Button
} from 'react-bootstrap';
import { 
    FaEdit,
    FaInfoCircle,
    FaCaretRight,
    FaCheck,
    FaTimes
} from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState, Select } from "../../../components";
import BaseSelect from "react-select";
import Utils from "../../../utils/Utils";
import FormValidator from "../../../validators/FormValidator";
import "./style.css";

const {
    PUBLIC_URL
} = process.env;

class BankAccount extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        validated: false,
        processing: false,
        enableForm: false,
        banks: { },
        formData: { }
    }

    
    componentWillMount = async () => {
        
        const { banks } = await this.cadastralDetailsService.getBanks();

        const options = banks.map(bank => this.mapToOption(bank));
        this.setState({ banks: options });
    }

    mapToOption = bank => {
        return {
            value: bank.id,
            label: bank.name
        }
    }


    enableForm = (status, index) =>{
        
        let formData = null;
        if(status){
            formData = {...this.props.accounts[index]};
        }else{
            formData = { };
        }
        this.setState({ enableForm: status, formData });
    };

    submitHandler = async submitEvent =>{
        
        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid });
        
        let formData = this.state.formData;
        this.setState({ processing: true });
        
        try{
            const{ message }  = await this.cadastralDetailsService.saveBankAccount(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false, enableForm: false });
        }
        
    }


    render = () => {

        const { enableForm, formData, processing, banks, validated } = this.state;
        const { accounts } = this.props;
        return (
            <Row>
                <Col sm={ 12 }>
                <Row>
                        <Col sm={12}>
                            <Form key={'formData'}
                                className={ enableForm ? '' : 'd-none' }
                                validated={ validated }
                                onSubmit={ this.submitHandler }
                                noValidate
                                >
                                <fieldset>
                                    <legend className="text-primary"><FaCaretRight /> Dados Bancários</legend>
                                    <Form.Row>
                                        <Form.Group as={ Col } sm={ 6 } controlId="formAccountType">
                                            <Form.Label>* Tipo de Conta</Form.Label>
                                            <Form.Control as="select" disabled={ !enableForm } required name="accountType" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.accountType || '' }>
                                                <option value=""></option>
                                                <option value="Conta Corrente">Conta Corrente</option>
                                                <option value="Conta Depósito">Conta Depósito</option>
                                                <option value="Conta Pagamento">Conta Pagamento</option>
                                                <option value="Poupança">Poupança</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={ Col } controlId="formBank">
                                            <Form.Label>* Banco</Form.Label>
                                            <Select 
                                                SelectComponent={ BaseSelect }
                                                placeholder={"Escolha uma opção..."}
                                                options={ banks } 
                                                name="bank"
                                                required
                                                isClearable
                                                value={  formData.bank != null ? formData.bank : '' }
                                                onChange={(value, action) => this.setState({ formData: Utils.onChangeHandleSelect(value, action.name, formData) }) }
                                            />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={ Col } sm={ 4 } controlId="formAgency">
                                            <Form.Label>* Agência <small>(sem o dígito)</small></Form.Label>
                                            <Form.Control type="text" rows="3" disabled={ !enableForm } required name="agency" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.agency || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={ Col } sm={ 2 } controlId="formOpCode">
                                            <Form.Label>* Cód. da Operação</Form.Label>
                                            <Form.Control type="text" rows="3" disabled={ !enableForm } required name="opCode" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.opCode || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group as={ Col } sm={ 6 } controlId="formAccount">
                                            <Form.Label>* Conta <small>(com o dígito)</small></Form.Label>
                                            <Form.Control type="text" rows="3" disabled={ !enableForm } required name="account" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.account || '' }/>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={ 12 }>
                            <Card body bg="light" className="card-1">
                                <h2 className={ "text-center text-muted " + (processing === false && (accounts === null || accounts.length === 0) ? '' : 'd-none') }>
                                        Nenhuma informação foi adicionada
                                </h2>
                                <Row>
                                    { accounts.map( (item, index) => <BankItem key={ index } index={ index } enableForm={ this.enableForm } item={ item } />) }
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}


const BankItem = props => (
    <Col sm={ 4 }>
        <Card border="dark" className={ "card-1 mb-3 " + ( props.item.disabled ? 'text-muted': '' ) }>
            <Card.Header className="bg-light credicard-flag" >
                <img src={ PUBLIC_URL + '/img/' + (props.item ? props.item.icon : '')  } alt="Icone Bandeira"  width="50" />
                <Button className={ "float-right " + ( props.item.disabled ? 'd-none': '' ) } size={"xs"} style={{marginTop: '10px' }} variant="outline-dark" onClick={ evt => props.enableForm(true, props.index) }> <FaEdit /> Editar </Button>
            </Card.Header>
            <Card.Body>
                <Card.Title style={{ fontSize: '16px' }}>  
                    <strong>{ props.item ? props.item.bank.value + ' - ' + props.item.bank.label : '' }</strong>
                </Card.Title>
                <Card.Text as={"div"}>
                    <table >
                        <tbody>
                            <tr>
                                <td> <b> Tipo</b> </td>
                                <td>{ props.item ? props.item.accountType : '' }</td>
                            </tr>
                            <tr>
                                <td> <b>Agência</b> </td>
                                <td>{ props.item ? props.item.agency : '' }</td>
                            </tr>
                            <tr>
                                <td> <b> Conta </b> </td>
                                <td>{ props.item ? props.item.account : '' }</td>
                            </tr>
                        </tbody>
                    </table>
                </Card.Text>
            </Card.Body>
        </Card>
    </Col>
)


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount);