import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Menu from '../../components/Menu';
import {
    Container
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import { Alert } from "../../components";
import  ClientDataTable  from '../Client/ClientDataTable';
import  FormExample  from '../FormExample';
import  CrudConsultar  from '../Crud/Consultar';
import  CrudCadastrar  from '../Crud/Cadastrar';

import { 
    DataTableExample,
    CadastralDetails
} from "../";
import './Main.css';


class Main extends Component {

    render() {

        const { message, variant } = this.props.alert;

        return (
            <div>
                <Menu match={ this.props.match } history={ this.props.history }/>
                <Container fluid className="mb-0 mt-4">
                    <Alert
                            variant={variant}
                            onClose={() => this.props.alertClean()}
                            show={message != null}
                            message={message}
                        />
                </Container>
                <Switch>
                    <Route path={ `${this.props.match.path}/dataTableExample/` } exact component={ DataTableExample } />
                    <Route path={ `${this.props.match.path}/cadastral-details/` } exact render={ (props) => <CadastralDetails {...props} key={props.match.params.id} /> } />
                    <Route path={ `${this.props.match.path}/form/` } exact component={ FormExample } />
                    <Route path={ `${this.props.match.path}/crud` } exact component={ CrudConsultar } />
                    <Route path={ `${this.props.match.path}/crud/new` } exact component={ CrudCadastrar } />
                    {/* <Route path={ `${this.props.match.path}/clients/new` } exact component={ ClientForm } />
                    <Route path={ `${this.props.match.path}/clients/edit/:id` } exact component={ ClientForm } /> */}
                </Switch>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...alertActions
    }, dispatch);

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);