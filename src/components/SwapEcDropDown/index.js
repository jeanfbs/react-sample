import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { 
    Table,
    Button,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import { 
    FaTrashAlt, 
    FaTimes 
} from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { establishmentActions }  from "../../store/ducks/establishment";
import "./style.css";

class SwapEcDropDown extends Component {

    clear = event => {
        event.preventDefault();
        this.props.clear();
    }

    removeEc = (index) => {
        let { historic } = this.props.ec;
        historic.splice(index, 1);
        this.props.setHistoric(historic);
    }

    render = () => {
          
        return (
            <div className="table-scroll">
                <Table className="table-troca text-uppercase" striped bordered size="sm"> 
                    <thead>
                        <tr>
                            <th>Cod</th>
                            <th>Razão Social</th>
                            <th className="text-center">
                                <OverlayTrigger
                                    key={ "remove-all" }
                                    placement={ "left" }
                                    overlay={
                                        <Tooltip id={`tooltip-remove-all`}>
                                            Remover todos EC's
                                        </Tooltip>
                                    }>
                                    <Link to="#" className="text-danger" onClick={ this.clear }> <FaTrashAlt /> </Link>
                                </OverlayTrigger>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.ec.historic.map( (item, index) => <EstablishmentItem key={ index } index={ index } goToEc={ this.props.goToEc } removeEc={ this.removeEc } item={ item } />) }
                    </tbody>
                </Table>
            </div>
        )
    }
}


const EstablishmentItem = (props) => (
        <tr>
            <td> <Link to={`/main/establishments/${props.item.ec}/cadastral-details/`} onClick={ event => props.goToEc(props.item) }> { props.item.ec } </Link> </td>
            <td> { props.item.social_reason } </td>
            <td className="text-center">
                <OverlayTrigger
                    key={ "remove-item" }
                    placement={ "left" }
                    overlay={
                        <Tooltip id={`tooltip-remove-item`}>
                            Remover EC { props.item.ec }    
                        </Tooltip>
                    }>
                    <Link to="#" className="text-danger" onClick={ event => props.removeEc(props.index) }> <FaTimes /> </Link>
                </OverlayTrigger>
            </td>
        </tr>
);


const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...establishmentActions
    }, dispatch);

const mapStateToProps = state => ({
    ec: state.ec
});

export default connect(mapStateToProps, mapDispatchToProps)(SwapEcDropDown);