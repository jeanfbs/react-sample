import React, { Component } from 'react';
import {
    Form,
    Col,
    ButtonToolbar,
    Button,
    InputGroup,
    Row
} from 'react-bootstrap';
import { 
    FaEdit,
    FaTimes,
    FaCheck,
    FaMapMarkerAlt,
    FaClock,
    FaCalendarDay
} from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { alertActions }  from "../../../store/ducks/alert";
import { ButtonState, CepInput } from "../../../components";
import Utils from "../../../utils/FormDataSetter";

const initPeriodObj = {
    days: {

    },
    clocks: {
        regular: { },
        aditional: { }
    }
}

class Address extends Component {
    
    constructor(props){
        super(props);
        this.cadastralDetailsService = props.providers.cadastralDetailsService;
    }


    state = {
        validated: false,
        enablePeriodForm: false,
        storeFormData: this.props.address != null && this.props.address.store ? {...this.props.address.store}: { },
        postFormData: this.props.address != null && this.props.address.post ? {...this.props.address.post}: { },
        periodFormData: this.props.address != null && this.props.address.period ? {...this.props.address.period}: initPeriodObj,
        processing: false,
        aditional: false

    }

    enableForm = status =>{
        if(!status){
            this.setState({ periodFormData: this.props.address != null && this.props.address.period ? {...this.props.address.period} : initPeriodObj});
        }
        this.setState({ enablePeriodForm: status });
    }



    submitHandlerStoreForm = async formData => {
        
        try{
            const{ message }  = await this.cadastralDetailsService.saveStoreAddress(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }

    }

    submitHandlerPostForm = async formData => {
        
        try{
            const{ message }  = await this.cadastralDetailsService.savePostAddress(formData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }
    }

    submitHandlerPeriod = async event => {
        
        event.preventDefault();
        
        let { periodFormData } = this.state;

        try{
            const{ message }  = await this.cadastralDetailsService.savePeriodAddress(periodFormData);
            this.props.alertSuccess(message);
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false, enablePeriodForm: false });
        }

    }

    render = () => {

        const { 
            storeFormData,
            postFormData,
            enablePeriodForm,
            validated,
            periodFormData,
            processing,
            aditional
        } = this.state;
        
        return (
            <Row>
                <Col sm={ 12 }>
                    <Row>
                        <Col sm={ 6 }>
                            <AddressForm key={ "formStore" } 
                                submitHandler={ this.submitHandlerStoreForm }
                                title="Endereço da Loja"
                                data={ storeFormData }
                            />
                        </Col>
                        <Col sm={ 6 }>
                            <AddressForm key={ "formPost" } 
                                submitHandler={ this.submitHandlerPostForm }
                                title="Endereço de Correspondência"
                                data={ postFormData }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={ 12 }>
                            <Form key={ "workingHours" }
                            validated={ validated }
                            onSubmit={ this.submitHandlerPeriod }
                            noValidate
                            >
                            <fieldset>
                                <legend className="text-primary"> 
                                    <FaCalendarDay /> Dia de Funcionamento
                                    <Button size={"xs"} className={ "float-right " + ( !enablePeriodForm ? '' : 'd-none') } variant="outline-dark" type="button" onClick={ event => this.enableForm(true) }> <FaEdit /> Editar </Button>
                                </legend>
                                <Form.Row>
                                    <Form.Group as={ Col } controlId="formPeriod">
                                        <Form.Check custom inline name="days.dom" label="Dom" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-dom"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.dom }/>
                                        <Form.Check custom inline name="days.seg" label="Seg" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-seg"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.seg }/>
                                        <Form.Check custom inline name="days.ter" label="Ter" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-ter"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.ter }/>
                                        <Form.Check custom inline name="days.qua" label="Qua" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-qua"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.qua }/>
                                        <Form.Check custom inline name="days.qui" label="Qui" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-qui"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.qui }/>
                                        <Form.Check custom inline name="days.sex" label="Sex" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-sex"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.sex }/>
                                        <Form.Check custom inline name="days.sab" label="Sab" disabled={ !enablePeriodForm } type={"checkbox"} id={"check-sab"} onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event, periodFormData) }) } checked={ periodFormData.days.sab }/>
                                    </Form.Group>
                                </Form.Row>
                            </fieldset>
                            <fieldset>
                                <legend className="text-primary"> 
                                    <FaClock /> Horário de Funcionamento
                                </legend>
                                <Form.Row>
                                    <Form.Group as={ Col } sm={ 3 } controlId="formStart">
                                        <Form.Label>* Período</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text> <FaClock /> </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="time" required disabled={ !enablePeriodForm } name="clocks.regular.start" onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event,periodFormData) }) } value={ periodFormData.clocks.regular.start || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } sm={ 3 } controlId="formEnd">
                                        <Form.Label>* Até</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text> <FaClock /> </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="time" required  disabled={ !enablePeriodForm } name="clocks.regular.end" onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event,periodFormData) }) } value={ periodFormData.clocks.regular.end || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>   
                                    <Form.Group as={ Col } sm={ 3 } controlId="formStart">
                                        <Form.Label> 
                                            <Form.Check 
                                                custom 
                                                inline 
                                                name="aditional" 
                                                label="Período Adicional?" 
                                                type={"checkbox"} 
                                                id={"check-aditional"} 
                                                disabled={ !enablePeriodForm }
                                                onChange={ event => this.setState({ aditional: event.currentTarget.checked })} 
                                                checked={ aditional }
                                            />
                                        </Form.Label>
                                        <InputGroup className={ aditional ? '': 'd-none' }>
                                            <InputGroup.Prepend>
                                            <InputGroup.Text> <FaClock /> </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="time" disabled={ !enablePeriodForm } name="clocks.aditional.start" onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event,periodFormData) }) } value={ periodFormData.clocks.aditional.start || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={ Col } sm={ 3 } controlId="formEnd" className={ aditional ? '': 'd-none' }>
                                        <Form.Label>* Até</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Prepend>
                                            <InputGroup.Text> <FaClock /> </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control type="time"  disabled={ !enablePeriodForm } name="clocks.aditional.end" onChange={ event => this.setState({ periodFormData: Utils.onChangeHandlerComposite(event,periodFormData) }) } value={ periodFormData.clocks.aditional.end || '' }/>
                                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Form.Row>
                                <hr />
                                <Form.Row >
                                    <Col sm={12} >
                                        <ButtonToolbar className="float-right">
                                            <Button className={ "btn-tool " + ( enablePeriodForm ? '' : 'd-none') } variant="outline-secondary" type="button" onClick={ event => this.enableForm(false) }> <FaTimes /> Cancelar </Button>
                                            <ButtonState variant="outline-primary" type="submit" className={ "btn-tool " + ( enablePeriodForm ? '' : 'd-none') } loading={ processing } label={<span><FaCheck /> Salvar</span>} />
                                        </ButtonToolbar>
                                    </Col>
                                </Form.Row>
                            </fieldset>
                        </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        );
    };
}


const initForm = {
    address:{ }
}

class AddressForm extends Component {

    state = {
        validated: false,
        processing: false,
        enableForm: false,
        loadingAddress: false,
        formData: this.props.data != null ? {...this.props.data} : initForm
    }

    enableForm = status => {
        if(!status){
            this.setState({ formData: {...this.props.data} });
        }
        this.setState({ enableForm: status });
    }

    formValidationHandler = async (event, formData) => {
        
        event.preventDefault();
        
        await this.props.submitHandler(formData);
        this.setState({ processing: false, enableForm: false });
    }

    onBlur = address => {

        let { formData } = this.state;
        address.uf = formData.uf;
        formData = { ...address };
        this.setState({ formData });
    }

    render = () => {
        
        const { formData, validated, enableForm, processing } = this.state;

        return (
            <Form key={ this.props.key }
                validated={ validated }
                onSubmit={ evt => this.formValidationHandler(evt, formData) }
                noValidate
                >
                <fieldset>
                    <legend className="text-primary"> 
                        <FaMapMarkerAlt /> { this.props.title }
                        <Button size={"xs"} className={ "float-right " + ( !enableForm ? '' : 'd-none') } variant="outline-dark" type="button" onClick={ event => this.enableForm(true) }> <FaEdit /> Editar </Button>
                    </legend>
                    <Form.Row>
                        <CepInput 
                            customInput={ Form.Control } 
                            sm={ 12 } 
                            format="##.###-###" 
                            mask="_" 
                            disabled={ !enableForm }
                            name="cep"
                            onBlur={ this.onBlur }
                            onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } 
                            value={ formData.cep || '' }
                        />
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col }  controlId="formStreet">
                            <Form.Label>* Logradouro</Form.Label>
                            <Form.Control type="text" disabled={ !enableForm } required name="street" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.street || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col }  controlId="formDistrict">
                            <Form.Label>* Bairro</Form.Label>
                                <Form.Control type="text" disabled={ !enableForm } required name="district" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.district || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={ Col } controlId="formCity">
                            <Form.Label>* Cidade</Form.Label>
                            <Form.Control type="text" disabled={ !enableForm } required name="city" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.city || '' }/>
                            <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={ Col }  controlId="formUf">
                            <Form.Label>* UF</Form.Label>
                            <Form.Control type="text" disabled={ !enableForm } required name="uf" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.uf || '' }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Address);