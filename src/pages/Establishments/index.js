import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import { establishmentActions } from '../../store/ducks/establishment';
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
} from "react-icons/fa";
import { Spinner, DataTable } from "../../components";
import Utils from "../../utils/Utils";


class Establishments extends Component {

    configDataTable = {
        url: "http://www.mocky.io/v2/5da903e631000058004e0699",
        headers: {
            Authorization: "Bearer aksdjflkasjflkjqwkljfiasdjfisadjf",
            client_id: "alksdjf12312sadlkfj12lk3j"
        },
        columns: [
            {
                name: "ec",
                value: "EC",
                searchable: true,
                render: (column, rowData) => {
                    return <Link to={`${this.props.match.url + rowData.ec}/cadastral-details/`} onClick={ event => this.goToEc(rowData) }>{ rowData.ec }</Link>;
                }
                
            },
            {
                name: "cnpj",
                value: "CNPJ",
                searchable: true,
                render: (column, rowData) => {
                    return Utils.cnpjMask(rowData.cnpj);
                }
            },
            {
                name: "social_reason",
                value: "Razão Social",
                searchable: true
            },
            {
                name: "fantasy_name",
                value: "Nome Fantasia"
            },
            {
                name: "blocked",
                value: "Bloqueado",
                searchable: false,
                sortable: false,
                className: "text-center",
                render: (column, rowData) => {
                    return rowData.blocked ? <Badge variant="danger">Sim</Badge>: <Badge variant="secondary">Não</Badge>;
                }
            }
        ]
    }

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
        this.apiResponseResolver = props.providers.apiResponseResolver;
        this.establishmentService = props.providers.establishmentService;
    }

    state = {
        queryValue: null,
        results: null,
        enableHistoric: true,
        processing: false
    }

    goToEc = establishment => {
        const { historic } = this.props.ec;
        this.establishmentService.loadEstablishment(establishment, historic, this.props.setHistoric, this.props.setCurrentEc);
    }

    componentWillMount = () => {
        const { historic } = this.props.ec;
        this.setState({ enableHistoric: historic.length !== 0 })
        this.props.setCurrentEc(null);
    }


    onDataTableUpdated = () => {
        this.setState({ enableHistoric: false })
    }

    render = () => {

        const { processing, enableHistoric } = this.state;
        const { historic } = this.props.ec;
        return (
            <div>
                <Container fluid>
                    <br />
                    <Card border="secondary" className="card-1">
                        <Card.Header><FaStoreAlt  className="icon"/> Estabelecimentos Comerciais</Card.Header>
                        <Card.Body>
                            <Row className={"m-0"}>
                                <Col sm="12">
                                    <DataTable 
                                        responsive  
                                        placeHolder="Buscar estabelecimentos..."
                                        key={ "establishmentsTable" }
                                        config={ this.configDataTable }
                                        updated={ this.onDataTableUpdated }
                                    />
                                </Col>
                            </Row>
                            <Row className={"m-0 " + (enableHistoric ? '' : 'd-none')}>
                                <Col sm="12">
                                    <TableHistoricEc historic={historic} processing={processing} goToEc={ this.goToEc } match={ this.props.match } />
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


const TableHistoricEc = props => (
    <Table striped size="sm">
        <caption>Histórico Estabelecimentos</caption>
        <thead>
            <tr>
                <th>EC</th>
                <th>Razão Social</th>
            </tr>
        </thead>
        <tbody>
            {props.historic.map((item, idx) => <EstablishmentsItem key={idx} match={ props.match }  item={item} goToEc={ props.goToEc }/>)}
            <tr className={props.processing === false && (props.historic === null || props.historic.length == 0) ? '' : 'd-none'}>
                <td colSpan="2" className="text-center"> Nenhum resultado a ser exibido</td>
            </tr>
            <tr className={props.processing ? '' : 'd-none'}>
                <td colSpan="2" className="text-center"> <Spinner loading="true" variant="dark" width="20" height="20" /> Carregando...</td>
            </tr>
        </tbody>
    </Table>
)


const EstablishmentsItem = props => (
    <tr>
        <td> <Link to={`${props.match.url + props.item.ec}/cadastral-details/`} onClick={ event => props.goToEc(props.item) }> { props.item.ec }</Link> </td>
        <td>{ props.item.social_reason }</td>
    </tr>
)


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

export default connect(mapStateToProps, mapDispatchToProps)(Establishments);