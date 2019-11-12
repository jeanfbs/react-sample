import React, { Component } from 'react';
import {
    Card,
    Col,
    Row,
    Form,
    Alert,
    InputGroup,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import FormValidator from "../../validators/FormValidator";
import Utils from "../../utils/Utils";
import { Link } from "react-router-dom";
import { ButtonState } from "../../components";
import { FaSignInAlt, FaLock } from "react-icons/fa";


class Reset extends Component {

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }


    state = {
        validated: false,
        processing: false,
        formData: { }
    }

    
    submitHandler = async submitEvent => {

        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid, processing: !isInvalid });
        if(isInvalid){
            return false;
        }
        
        const { formData } = this.state;
        
        try{
            const response = await this.authService.reset(formData);
            this.props.alertSuccess("A nova senha foi salva com sucesso!");
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }
    }

    render = () => {

        const { 
            validated, 
            formData, 
            processing 
        } = this.state;
        const { message, variant, isShowing } = this.props.alert;

        return (
            <>
            <br/>
            <br/>
                <Row>
                <Col sm={4} className='offset-4'>
                    <Card key={"activate-panel"} border="dark" className="card-1" >
                        <Card.Body>
                            <div>
                                <Row>
                                    <Col sm={12} className="text-center" >
                                        <h2> Nova Senha</h2>
                                        <hr/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={ 12 } >
                                        <Alert key={ "error-alert" } className="p-3" show={ isShowing } onClose={ () => this.props.alertClean() } dismissible variant={ variant || '' }>
                                            { message }
                                        </Alert>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                    <Form key={'resetForm'}
                                        validated={ validated }
                                        onSubmit={this.submitHandler}
                                        noValidate>
                                        <Form.Group controlId="inputPassword">
                                            <Form.Label>* Senha</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaLock className="text-primary" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" required autoFocus placeholder="Digite a Senha" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } name="password" value={ formData.password || '' } />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="confirmationPassword">
                                            <Form.Label>* Confirmação de Senha</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaLock className="text-primary" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" required placeholder="Confirme a senha novamente" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } name="confirmation" value={ formData.confirmation || '' } />
                                                <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <br/>
                                        <Form.Group controlId="button" className="float-none">
                                            <ButtonState block variant="outline-primary" spinner="dark" type="submit" loading={ processing } label="Alterar Senha" />
                                        </Form.Group>
                                    </Form>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Link to="/" onClick={ event => this.props.alertClean() } className="float-right"><strong><FaSignInAlt /> Ir para página de Login</strong></Link>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Reset);