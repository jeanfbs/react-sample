import React, { Component } from 'react';
import {
    Card,
    Col,
    Row,
    Form,
    Alert,
    InputGroup
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaExclamationTriangle } from "react-icons/fa";
import { ButtonState } from "../../components";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import Utils from "../../utils/FormDataSetter";
import "./style.css";


const { PUBLIC_URL } = process.env;

 class Login extends Component {

    
    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }

    state = {
        validated: false,
        processing: false,
        formData: {  }
    }

    submitHandler = async submitEvent => {
        
        const { formData } = this.state;
        
        try{
            const { token, username } = await this.authService.login(formData);
            this.props.loginAction(token, username);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }
    }

    render = () => {
        
        const { processing, formData, validated } = this.state;
        const { message, variant, isShowing } = this.props.alert;
        
        return (
            <Row id="login-row">
                <Col sm={ 4 } className="offset-4">
                    <Card key={ "login-form" } id="login" border="dark" className="card-1">
                        <Card.Body>
                            <Row>
                                <Col sm={ 12 } >
                                    <div id="logo">
                                        <span id="logo-light">React</span><span id="logo-dark">Sample</span>
                                    </div>
                                    <br/>
                                    <h5 className="text-center text-primary">Acesso ao Atendimento</h5>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col sm={ 12 } >
                                    <Alert key={ "error-alert" } show={ isShowing } onClose={ () => this.props.alertClean() } dismissible variant={ variant || '' }>
                                        <Row>
                                            <Col sm={2}>
                                                <FaExclamationTriangle style={{ fontSize: "22px" }}/>    
                                            </Col>
                                            <Col sm={10}>
                                                { message }
                                            </Col> 
                                        </Row>
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={ 12 } >
                                    <Form key={ 'loginForm' }
                                        validated={ validated }
                                        onSubmit={ this.submitHandler }
                                        noValidate
                                        >
                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaUser className="text-secondary" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="text"
                                                    required
                                                    onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) }
                                                    name="username"
                                                    value={ formData.username || ''}
                                                    placeholder="Usuário, Email"
                                                />
                                                <Form.Control.Feedback type="invalid">O Usuário é obrigatório!</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><FaLock className="text-secondary" /></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" 
                                                    required 
                                                    onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } 
                                                    name="password" 
                                                    value={ formData.password || '' } 
                                                    placeholder="Senha"
                                                    />
                                                <Form.Control.Feedback type="invalid">A senha é obrigatória!</Form.Control.Feedback>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group controlId="links">
                                            <Form.Text className="text-primary float-left"><Link to={ '/recovery' } >Esqueci minha senha</Link></Form.Text>
                                            <Form.Text className="text-primary float-right"><Link to={ '/register' } >Criar Minha Conta</Link></Form.Text>
                                            <br/>
                                        </Form.Group>
                                        <Form.Group controlId="button">
                                            <ButtonState block variant="outline-primary" spinner="dark" type="submit" loading={ processing } label="Entrar" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);