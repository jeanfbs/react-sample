// import React, { Component } from 'react';
// import {
//     Card,
//     Col,
//     Row,
// } from 'react-bootstrap';

// import { Link } from "react-router-dom";
// import Alert from "../../components/Alert";
// import { FaSignInAlt, FaClock, FaCheckCircle } from "react-icons/fa";
// import { Auth } from "../../services";


// const auth = new Auth();

// export default class Activate extends Component {

//     state = {
//         message: null,
//         isLoading: true,
//         showError: false
//     };

//     componentWillMount = () =>{

//         const token = this.props.match.params.token;

//         auth.activate(token).then(res =>{
//             const { message } = res.data;
//             this.setState({ message, isLoading: false });
//         }).catch(err =>{
//             this.setState({ showError: true, message: null, isLoading: false });
//         });
        
//     }

//     render() {

//         const erroMessage = <span>
//                 Não foi possivel fazer a ativação dessa conta. Favor entrar em contato com o suporte.<br /><br />
//                 <b>Motivos:</b><br />
//                 <ul>
//                     <li>O ID da conta está inválido;</li>
//                     <li>O tempo limite de ativação alcançado;</li>
//                     <li>A conta já foi ativada;</li>
//                 </ul>
//             </span>

//         return (
//             <div>
//                 <Row>
//                 <Col sm={6} className='offset-sm-3'>
//                     <Card key={"activate-panel"} border="dark" className="card-1" >
//                         <Card.Body>
//                             <Row className={ this.state.isLoading || this.state.showError ? '' : 'd-none' }>
//                                 <Col sm={12} className="text-center" >
//                                     <h3 className='text-primary' ><FaClock /> Ativando Conta...</h3>
//                                     <hr/>
//                                     <p>Aguarde enquanto sua conta está sendo ativada...</p>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col sm={12}>
//                                     <Alert
//                                         variant="danger"
//                                         show={ this.state.showError }
//                                         message={erroMessage }
//                                     />
//                                 </Col>
//                             </Row>
//                             <div className={(this.state.isLoading || this.state.showError ? 'd-none' : '') }>
//                                 <Row>
//                                     <Col sm={12} className="text-center" >
//                                         <h2 className="text-success"><FaCheckCircle /> Conta Ativada Com Sucesso</h2>
//                                         <hr/>
//                                     </Col>
//                                 </Row>
//                                 <Row className={ this.state.showError ? 'd-none': ''}>
//                                     <Col sm={12}>
//                                         <p className="text-justify">
//                                             { this.state.message }
//                                         </p>
//                                         <p>Seus dados de acesso são:</p>
//                                         <ul>
//                                             <li><b> Usuario:</b> Email informado no cadastro</li>
//                                             <li><b> Senha:</b> O número do CNPJ ou CPF informado no cadastro</li>
//                                         </ul>
//                                     </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col sm={12}>
//                                         <Link to="/" className="float-right"><FaSignInAlt /> Ir para página de Login</Link>
//                                     </Col>
//                                 </Row>
//                             </div>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             </div>
//         )
//     }
// }
