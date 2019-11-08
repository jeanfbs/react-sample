// import React, { Component } from 'react';
// import {
//     Container,
//     Table,
//     Card,
//     ButtonToolbar,
//     Button,
//     Form,
//     Modal,
//     Alert
// } from 'react-bootstrap';
// import { LinkContainer } from "react-router-bootstrap";
// import { MdAdd, MdModeEdit, MdCancel, MdWarning, MdDone } from 'react-icons/md';
// import { Api } from '../../../services';


// export default class ClientDataTable extends Component {

//     state = {
//         clients: [],
//         clientsIdSeleceted: [],
//         showRemoveModal: false,
//         selectAll: false,
//         errorStatus: false,
//         successStatus: false,
//         message: ''
        
//     }

//     getAllClients = () => {
//         // Api.get(process.env.REACT_APP_BACKEND_HOST + process.env.REACT_APP_CLIENTS)
//         // .then(res => {
//         //     this.setState({clients: res.data})
//         // });
//     }

//     componentDidMount = () => {
//         this.getAllClients();
//     }

//     removeEvent = () => {
//         this.setState({ showRemoveModal: true });
//     }

//     confirmRemove = () => {

//         let ids = this.state.clientsIdSeleceted.join(",");
//         Api.delete(process.env.REACT_APP_BACKEND_HOST + process.env.REACT_APP_CLIENTS, { params: { ids:  ids}})
//         .then(res => {
//             const { message, flag_erro } = res.data;
//             let clientsIdSeleceted = this.state.clientsIdSeleceted;
//             clientsIdSeleceted.length = 0;
//             this.setState({ 
//                 message, 
//                 successStatus: !flag_erro, 
//                 errorStatus: flag_erro, 
//                 selectAll: false,
//                 clientsIdSeleceted
//             });
//             this.getAllClients();
//         }).catch(err =>{
//             this.setState({ 
//                 errorStatus: true
//             });
//         });

//         this.handleClose();
//     }

//     handleClose = () => {
//         this.setState({ showRemoveModal: false });
//     }

    
//     onChangeCheckClientRow = (event) => {

//         let clientsIdSeleceted = this.state.clientsIdSeleceted;
        
//         if(event.target.checked){
//             clientsIdSeleceted.push(event.target.value);
//         }else{
//             clientsIdSeleceted = clientsIdSeleceted.filter(idClient => idClient !== event.target.value);
//         }

//         let selectAll = this.state.clients.length === clientsIdSeleceted.length;
        
//         if(!selectAll){
//             selectAll = null;
//         }
//         this.setState({ selectAll , clientsIdSeleceted});
        
//     }

//     onChangeCheckSelectAll = (e) => {
//         let clientsIdSeleceted = [];
//         if(e.target.checked){
//             clientsIdSeleceted = this.state.clients.map(client => client.id);
//         }
//         this.setState({ 
//             selectAll: e.target.checked, 
//             clientsIdSeleceted
//         });
//     }

//     render() {

//         let clients = this.state.clients.map((result,index) => {
//             return <ClientRow key={ index } client={ result } selected={this.state.selectAll} onChangeCheck={ this.onChangeCheckClientRow } />
//             });

//         return (
//             <Container>
//                 <br/>
//                 <Card body className="card-1 border-dark">
//                     <Alert show={this.state.errorStatus != null && this.state.errorStatus} onClose={() => this.setState({errorStatus: false})} dismissible key='alert-error' variant='danger'>
//                         <MdWarning /> Erro ao tentar remover clientes!
//                     </Alert>
//                     <Alert show={this.state.successStatus != null && this.state.successStatus} onClose={() => this.setState({successStatus: false})} dismissible key='alert-success' variant='primary'>
//                         <MdDone /> {this.state.message}
//                     </Alert>
//                     <ButtonToolbar>
//                         <LinkContainer to={`${this.props.match.path}/new/`}>
//                             <Button variant="outline-secondary" disabled={ this.state.clientsIdSeleceted.length > 0 } size="xs"><MdAdd /> Novo</Button>
//                         </LinkContainer>
//                         <LinkContainer to={`${this.props.match.path}/edit/${this.state.clientsIdSeleceted[0]}`}>
//                             <Button variant="outline-secondary" size="xs" disabled={ this.state.clientsIdSeleceted.length !== 1 }><MdModeEdit /> Editar</Button>
//                         </LinkContainer>
//                         <Button variant="outline-danger" disabled={ this.state.clientsIdSeleceted.length === 0 } onClick={this.removeEvent} size="xs"><MdCancel /> Remover</Button>
//                     </ButtonToolbar>
//                 <Table responsive bordered hover size="sm" className="text-center">
//                     <caption>Tabela de Clientes</caption>
//                     <thead >
//                         <tr className="thead-light">
//                             <th>
//                                 <Form.Check type="checkbox" 
//                                     checked={ this.state.selectAll != null && this.state.selectAll }
//                                     onChange={ this.onChangeCheckSelectAll }
//                                 />
//                                 </th>
//                             <th>CPF/CNPJ</th>
//                             <th>Nome Fantasia</th>
//                             <th>Razão Social</th>
//                             <th>Email</th>
//                             <th>Telefone</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr className={clients.length === 0 ? '': 'd-none'}>
//                             <td colSpan='6'>Nenhum resultado a ser exibido</td>
//                         </tr>
//                         {clients}
//                     </tbody>
//                 </Table>
//                 </Card>

//                 <Modal key="clientModal" centered show={this.state.showRemoveModal} onHide={this.handleClose}>
//                     <Modal.Header closeButton>
//                     <Modal.Title>Exclusão de Clientes</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>Tem certeza que deseja remover {this.state.clientsIdSeleceted.length} clientes?</Modal.Body>
//                     <Modal.Footer>
//                     <Button variant="secondary" onClick={this.handleClose}>Não</Button>
//                         <Button variant="danger" onClick={this.confirmRemove}>Sim</Button>
//                     </Modal.Footer>
//                 </Modal>
//             </Container>
//         )
//     }
// }



// class ClientRow extends Component {

//     state = {
//         clientSelected: false
//     }
    
//     onChangeCheck = (event) => {
        
//         let selected = event.target.checked;
//         this.setState({ clientSelected: selected });
//         this.props.onChangeCheck(event);
        
//     }

//     componentWillReceiveProps(nextProps){
//         if(nextProps.selected != null){
            
//             if(nextProps.selected){
//                 this.setState({ clientSelected: true });
//             }else if(!nextProps.selected){
//                 this.setState({ clientSelected: false });
//             }
//         }
        
//     }



//     render() {
//         var item = this.props.client;
//         return (
//             <tr className={ this.state.clientSelected ? 'text-secondary': ''}>
//                 <td>
//                     <Form.Check 
//                         key={ item.client_id } 
//                         type="checkbox" 
//                         value={ item.client_id } 
//                         checked={ this.state.clientSelected } 
//                         onChange={ this.onChangeCheck } 
//                     />
//                 </td>
//                 <td>{ item.client_id }</td>
//                 <td>{ item.fantasy_name }</td>
//                 <td>{ item.social_reason }</td>
//                 <td>{ item.email }</td>
//                 <td>{ item.phone }</td>
//             </tr>
//         )
//     }
// }
