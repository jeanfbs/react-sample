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
import { alertActions }  from "../../store/ducks/alert";
import BaseSelect from "react-select";
import { ButtonState, Select } from "../../components";
import Utils from "../../utils/Utils";
import FormValidator from "../../validators/FormValidator";

class FormExample extends Component {

    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }

    state = {
        validated: false,
        processing: false,
        items: { },
        formData: { }
    }

    componentWillMount = async () => {
        
        const { banks } = await this.cadastralDetailsService.getBanks();

        const options = banks.map(item => this.mapToOption(item));
        this.setState({ items: options });
    }

    mapToOption = item => {
        return {
            value: item.id,
            label: item.name
        }
    }

    submitHandler = async submitEvent =>{
        
        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid });
        
        if(isInvalid){
            return false;
        }

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
        const { formData, processing, validated, items } = this.state;

        return (
            <Container fluid>
                <Card className="card-1 border-dark">
                    <Card.Header className="bg-primary text-white">
                        <span><FaEdit  className="icon"/> Exemplo Formulário</span>
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
                                <FaCaretRight /> Tipos de Campos
                            </legend>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 }>
                                    <Form.Label>* Texto Normal</Form.Label>
                                    <Form.Control size="sm" type="text" required name="normalText" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.normalText || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } sm={ 6 } xs={ 12 }>
                                    <Form.Label>* Número Formatado</Form.Label>
                                    <NumberFormat size="sm" customInput={ Form.Control } placeholder="##.###.###/####-##" format="##.###.###/####-##" mask="_" required name="formattedNumber" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.formattedNumber || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 2 } xs={ 12 }>
                                    <Form.Label>* Apenas Número</Form.Label>
                                    <Form.Control size="sm" type="number" required name="justNumber" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.justNumber || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={ Col } sm={ 4 } xs={ 12 }>
                                    <Form.Label>* Data</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaCalendarAlt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control size="sm" type="date" required name="data" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.data || '' }/>
                                        <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 } controlId="formPhone">
                                    <Form.Label>Telefone Formatado</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <NumberFormat size="sm" customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 }>
                                    <Form.Label>* Text Area</Form.Label>
                                    <Form.Control style={{ resize:'none' }} as="textarea" rows="3" required name="textarea" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.textarea || '' }/>
                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 }>
                                    <Form.Label>E-Mail</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text> <FaAt /> </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control size="sm" type="email" name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || '' }/>
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                        </fieldset>
                        <fieldset>
                            <legend className="text-primary"> <FaCaretRight />Tipo de Caixa de Seleção</legend>
                            <Form.Row>
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 } sm={ 6 }>
                                    <Form.Label>Tipo Padrão</Form.Label>
                                    <Form.Control as="select" size="sm" name="selectOptions" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.selectOptions || '' }>
                                        <option value="1">Opcao 1</option>
                                        <option value="1">Opcao 2</option>
                                        <option value="1">Opcao 3</option>
                                        <option value="1">Opcao 4</option>
                                        <option value="1">Opcao 5</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={ Col } controlId="formBank">
                                    <Form.Label>* Seleção com Pesquisa</Form.Label>
                                    <Select 
                                        SelectComponent={ BaseSelect }
                                        placeholder={"Seleção com Pesquisa"}
                                        options={ items } 
                                        name="selectSearch"
                                        required
                                        isClearable
                                        value={  formData.selectSearch || '' }
                                        onChange={(value, action) => this.setState({ formData: Utils.onChangeHandleSelect(value, action.name, formData) }) }
                                    />
                                </Form.Group>
                            </Form.Row>
                        </fieldset>
                        <fieldset>
                            <legend className="text-primary"> <FaCaretRight />Outros</legend>
                            <Form.Row>
                                

                                <Form.Group as={ Col } sm={ 6 } xs={ 12 } controlId="formEmail">
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
                                <Form.Group as={ Col } sm={ 6 } xs={ 12 } sm={ 6 } controlId="formWhiteList">
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