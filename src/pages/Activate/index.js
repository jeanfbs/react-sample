import React, { Component } from 'react';
import {
    Card,
    Col,
    Alert,
    Row,
} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FaSignInAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import Utils from "../../utils/FormDataSetter";

class Activate extends Component {

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }

    state = {
        processing: true
    }

    componentWillMount = async () =>{

        const tokenTransient = this.props.match.params.token;
        try{
            const response = await this.authService.activate(tokenTransient);
        }catch(err){

            const erroMessage = <span>
                Não foi possivel fazer a ativação dessa conta. Favor entrar em contato com o suporte.<br /><br />
                <b>Motivos:</b><br />
                <ul>
                    <li>O ID da conta está inválido;</li>
                    <li>Tempo limite de ativação alcançado;</li>
                    <li>A conta já está ativada;</li>
                </ul>
            </span>
            this.props.alertError(erroMessage);
        }finally{
            this.setState({ processing: false });
        }
    }

    render = () => {

        const { processing } = this.state;
        const { message, variant, isShowing } = this.props.alert;

        return (
            <div>
                <Row>
                <Col sm={6} className='offset-sm-3'>
                    <Card key={"activate-panel"} border="dark" className="card-1" >
                        <Card.Body>
                            <Row className={ processing || isShowing ? '' : 'd-none' }>
                                <Col sm={12} className="text-center" >
                                    <h3 className='text-primary' ><FaClock /> Ativando Conta...</h3>
                                    <hr/>
                                    <p>Aguarde enquanto sua conta está sendo ativada...</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={ 12 } >
                                    <Alert key={ "error-alert" } className="p-3" show={ isShowing } onClose={ () => this.props.alertClean() } dismissible variant={ variant || '' }>
                                        { message }
                                    </Alert>
                                </Col>
                            </Row>
                            <div className={(processing || isShowing ? 'd-none' : '') }>
                                <Row>
                                    <Col sm={12} className="text-center" >
                                        <h2 className="text-primary"><FaCheckCircle /> Conta Ativada Com Sucesso</h2>
                                        <hr/>
                                    </Col>
                                </Row>
                                <Row className={ isShowing ? 'd-none': ''}>
                                    <Col sm={12}>
                                        <p className="text-justify">
                                            { this.state.message }
                                        </p>
                                        <p>Seus dados de acesso são:</p>
                                        <ul>
                                            <li><b> Usuario:</b> Email informado no cadastro</li>
                                            <li><b> Senha:</b> O número do CNPJ ou CPF informado no cadastro</li>
                                        </ul>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={12}>
                                        <Link to="/" className="float-right"><FaSignInAlt /> Ir para página de Login</Link>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Activate);