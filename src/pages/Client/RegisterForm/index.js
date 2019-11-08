// import React, { Component } from 'react'
// import {
//     Container,
//     Card,
//     Button,
//     Col,
//     Row,
//     Form,
//     Alert,
//     ButtonToolbar
// } from 'react-bootstrap';
// import { FaTrashAlt, FaCheck } from "react-icons/fa";
// import { Api } from '../../../services';
// import { SelectState, ButtonState, Spinner } from "../../../components";
// // import { Commons } from "../../../services"


// // const commons = new Commons();

// export default class RegisterForm extends Component {

//     state = {
//         validated: false,
//         typeMessage: 'primary',
//         message: null,
//         processing: false,
//         loadingAddress: false,
//         enableSubmitButton: false,
//         client: { 
//             address: { }
//         }
//     }

//     handleOnChange = (event) => {
        
//         const value = event.target.value;
//         let name = event.target.name;
//         const { client } = this.state;
        
//         if(name.includes("address")){
//             name = name.split(".")[1];
//             client.address[ name ] = value;
//         }else{
//             client[ name ] = value;
//         }
//         this.setState({ client });
//     }

//     componentDidMount = () => {
//         const idClient = this.props.match.params.id
//         // if(!commons.isNotBlank(idClient)){
//         //     return;
//         // }
//         Api.get(process.env.REACT_APP_BACKEND_HOST + process.env.REACT_APP_CLIENTS + idClient)
//         .then(res => {
//             const client = res.data;
//             this.setState({ client });

//         });
//     }

//     onBlurCep = (event) => {
        
//         // this.setState({ loadingAddress: true });
//         // commons.findAddressByCep(event).then(address => {
//         //     const { client } = this.state;
//         //     client.address = address;
//         //     this.setState({ client });
//         // }).finally( () => {
//         //     this.setState({ loadingAddress: false });
//         // });
//     }

//     resetForm = () => {
//         this.setState({ 
//             client: { 
//                 address: {}
//             }
//          });
//     }

//     submitHandler = (event) => {
        
//         event.preventDefault();
//         const form = event.currentTarget;
//         const isInvalid = !form.checkValidity();

//         this.setState({ validated: isInvalid });

//         if (isInvalid) {
//             event.stopPropagation();
//             return false;
//         }
        
//         let client = this.state.client;
//         client.address.number = parseInt(client.address.number);
//         client.status = true;

//         Api.post(process.env.REACT_APP_BACKEND_HOST + process.env.REACT_APP_CLIENTS, client)
//         .then(res => {
//             if(this.props.match.params.idClient !== null){
//                 this.resetForm();
//             }
//             this.setState({ 
//                 typeMessage: 'primary',
//                 message: 'O cliente foi salvo com sucesso!'
//             });
//             window.scrollTo(0, 0);
//         }).catch(error => {
//             this.setState({ 
//                 typeMessage: 'danger',
//                 message: error.response.data.message
//             });
//         }).finally(() => {
//             this.setState({ processing:false });
//         });

//         this.setState({ processing: true });
//     }

//     render() {


//         return (
//             <Container>
//                 <br/>
//                 <Card body className="card-1 border-dark">
//                     <Row>
//                     <Alert 
//                         variant={ this.state.typeMessage } 
//                         onClose={ () => this.setState({ message: null }) } 
//                         show={ this.state.message !== null } 
//                         message={ this.state.message } 
//                     />
//                     </Row>
//                     <Row>
//                         <Form key={'clientForm'}
//                             validated={this.state.validated}
//                             onSubmit={this.submitHandler}
//                             noValidate>
//                             <fieldset>
//                                 <legend>Dados Cliente</legend>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right">* CNPJ/CPF </Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" required name="client_id" onChange={this.handleOnChange} value={this.state.client.client_id || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right">* Razão Social </Form.Label>
//                                     <Col sm="6">
//                                         <Form.Control type="text" required name="social_reason" onChange={this.handleOnChange} value={this.state.client.social_reason || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right">* Nome Fantasia </Form.Label>
//                                     <Col sm="6">
//                                         <Form.Control type="text" required name="fantasy_name" onChange={this.handleOnChange} value={this.state.client.fantasy_name || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right"> Inscrição Municipal</Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" name="insc_municipal" onChange={this.handleOnChange} value={this.state.client.insc_municipal || ''} />
//                                     </Col>
//                                     <Form.Label column sm="2" className="text-right"> Inscrição Estadual </Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" name="insc_estadual" onChange={this.handleOnChange} value={this.state.client.insc_estadual || ''} />
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right">* E-Mail</Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="email" required name="email" onChange={this.handleOnChange} value={this.state.client.email || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                     <Form.Label column sm="2" className="text-right"> Telefone </Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="phone" name="phone" onChange={this.handleOnChange} value={this.state.client.phone || ''} />
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right"> Site</Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" name="site" onChange={this.handleOnChange} value={this.state.client.site || ''} />
//                                     </Col>
//                                 </Form.Group>
//                             </fieldset>
//                             <br />
//                             <fieldset>
//                                 <legend>Endereço</legend>
//                                 <Form.Group as={Row} >
//                                     <Form.Label column sm="2" className="text-right"> CEP </Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="number" name="address.cep" onBlur={this.onBlurCep} onChange={this.handleOnChange} value={this.state.client.address.cep || ''} />
//                                     </Col>
//                                     <Spinner variant="dark" width="25" height="25" loading={this.state.loadingAddress} />
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right"> * Logradouro </Form.Label>
//                                     <Col sm="6">
//                                         <Form.Control type="text" required disabled={this.state.loadingAddress} name="address.street" onChange={this.handleOnChange} value={this.state.client.address.street || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                     <Form.Label column sm="2" className="text-right"> * Número </Form.Label>
//                                     <Col sm="2">
//                                         <Form.Control type="number" required disabled={this.state.loadingAddress} min="0" name="address.number" onChange={this.handleOnChange} value={this.state.client.address.number || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right"> * Bairro </Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" required disabled={this.state.loadingAddress} name="address.district" onChange={this.handleOnChange} value={this.state.client.address.district || ''} />
//                                         <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
//                                     </Col>
//                                     <Form.Label column sm="2" className="text-right"> Complemento</Form.Label>
//                                     <Col sm="4">
//                                         <Form.Control type="text" name="address.complement" onChange={this.handleOnChange} value={this.state.client.address.complement || ''} />
//                                     </Col>
//                                 </Form.Group>
//                                 <Form.Group as={Row}>
//                                     <Form.Label column sm="2" className="text-right"> Cidade </Form.Label>
//                                     <Col sm="3">
//                                         <Form.Control type="text" name="address.city" onChange={this.handleOnChange} value={this.state.client.address.city || ''} />
//                                     </Col>
//                                     <Form.Label column sm="1" className="text-right"> UF</Form.Label>
//                                     <Col sm="3">
//                                         <SelectState name="address.state" onChange={this.handleOnChange} value={this.state.client.address.state || ''} />
//                                     </Col>
//                                 </Form.Group>
//                             </fieldset>
//                             <Form.Group as={Row}>
//                                 <Col className="offset-sm-2">
//                                     <ButtonToolbar>
//                                         <Button variant="secondary" type="button" onClick={this.resetForm} ><FaTrashAlt /> Limpar </Button>
//                                         <ButtonState variant="primary" type="submit" loading={this.state.processing} label={<span><FaCheck /> Salvar</span>} />
//                                     </ButtonToolbar>
//                                 </Col>
//                             </Form.Group>
//                         </Form>
//                     </Row>
//                 </Card>
//                 <br/>
//             </Container>
//         )
//     }
// }
