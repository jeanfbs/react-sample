import React, { Component } from 'react';
import {
    Card,
    Col,
    Row,
    Form,
    Alert,
    InputGroup
} from 'react-bootstrap';
import { FaAt, FaExclamationTriangle } from "react-icons/fa";
import { ButtonState } from "../../components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import FormValidator from "../../validators/FormValidator";
import Utils from "../../utils/Utils";


class Recovery extends Component {

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }

    state = {
        validated: false,
        processing: false,
        formData: { }
    }

    handleOnChange = event => {
        let value = event.target.value;
        this.setState({ email: value });
    }


    submitHandler = async submitEvent => {

        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid, processing: !isInvalid });

        if(isInvalid){
            return false;
        }
        const { formData } = this.state;
        
        try{
            const response = await this.authService.recovery(formData);
            this.props.alertSuccess("Um email foi encaminhado com as instruções de recuperação da senha.");
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }
    }

    render = () => {
        
        const { validated, formData, processing } = this.state;
        const { message, variant, isShowing } = this.props.alert;
        
        return (
            <Row>
                <Col sm={ 4 } className='offset-4'>
                    <Card key={ "login-form" } id="login" border="dark" className="card-1">
                        <Card.Body>
                            <Row>
                                <Col sm={ 12 } >
                                    <h2 className="text-center">Recuperar Senha</h2>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={ 12 } >
                                    <Alert key={ "error-alert" } className="p-3" show={ isShowing } onClose={ () => this.props.alertClean() } dismissible variant={ variant || '' }>
                                        { message }
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={ 12 }>
                                    <Form key={ 'loginForm'}
                                        validated={ validated }
                                        onSubmit={ this.submitHandler }
                                        noValidate>
                                        <Form.Group controlId="inputEmail">
                                            <Form.Label>E-Mail</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaAt className="text-primary" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="email"
                                                    required
                                                    onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } 
                                                    name="email"
                                                    value={ formData.email || '' }
                                                    placeholder="exemplo@exemplo.com"
                                                />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="button" className="float-none">
                                            <ButtonState block variant="outline-primary" spinner="dark" type="submit" loading={ processing } label="Enviar" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...authActions,
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    auth: state.auth,
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);