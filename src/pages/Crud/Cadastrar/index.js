import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../../store/ducks/auth";
import { alertActions }  from "../../../store/ducks/alert";
import { establishmentActions } from '../../../store/ducks/establishment';

import {
    Container,
    Card,
    Table,
    Row,
    Col,
    Badge,
} from 'react-bootstrap';
import {
    FaStoreAlt,
    FaQuestionCircle
} from "react-icons/fa";
import { Spinner, DataTable } from "../../../components";
import Utils from "../../../utils/Utils";


class CrudCadastrar extends Component {


    constructor(props){
        super(props);
        this.authService = props.providers.authService;
        this.apiResponseResolver = props.providers.apiResponseResolver;
        this.establishmentService = props.providers.establishmentService;
    }


    render = () => {

        return (
            <div>
                <Container fluid>
                    <br />
                    <Card border="secondary" className="card-1">
                        <Card.Header className="bg-primary text-white">
                            <span><FaStoreAlt  className="icon"/> Cadastrar Novo Registro</span>
                            <span className="float-right">
                                <Link to="#help"><FaQuestionCircle  className="icon icon-help"/></Link>    
                            </span>
                        </Card.Header>
                        <Card.Body>
                            <Row className={"m-0"}>
                                <Col sm="12">
                                    
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <br />
                </Container>
            </div>
        )
    };
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...authActions,
        ...establishmentActions,
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    auth: state.auth,
    alert: state.alert,
    ec: state.ec
});

export default connect(mapStateToProps, mapDispatchToProps)(CrudCadastrar);