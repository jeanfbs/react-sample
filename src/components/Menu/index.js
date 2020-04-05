import React, { Component } from 'react';
import { 
    Navbar, 
    Nav, 
    NavDropdown,
    Row,
    Col,
    Dropdown,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
    FaUserCircle, 
    FaTable,
    FaBars,
    FaStoreAlt,
    FaSignOutAlt, 
    FaTachometerAlt, 
    FaLifeRing, 
    FaUserEdit,
    FaTasks,
    FaBan,
} from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import SwapEcDropDown from "../SwapEcDropDown";
import { authActions }  from "../../store/ducks/auth";
import { establishmentActions }  from "../../store/ducks/establishment";
import Utils from "../../utils/Utils";
import "./Menu.css";



const {
    PUBLIC_URL,
    REACT_APP_PORTAL_WEB: PORTAL_WEB
} = process.env;

class Menu extends Component {

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }


    logoutHandler = () => {
        this.authService.logout();
    }

    render = () => {

        const currentUser  = this.props.auth.user;
        const currentEc  = this.props.ec.current;
        const textMenu = <span className="text-uppercase"><FaUserCircle  className="icon mr-1" /> { currentUser !== null ? 'Teste' : '' } </span> ;
        
        return (
            <>
                <Navbar className="navbar-theme" collapseOnSelect expand="md" variant="primary" bg="white">
                
                <Navbar.Brand href="#" onClick={ ev => ev.preventDefault() }>
                    <img src={ PUBLIC_URL + '/img/logo.png' } alt="React" width="120" className="d-inline-block align-middle" />
                </Navbar.Brand>
                <Navbar.Toggle className="text-primary" children={ <FaBars />} />
                <Navbar.Collapse>
                    <Nav>
                        <NavLink to={`${this.props.history.location.pathname.split("/").slice(0, 2).join("/")}/dashboard/`} className="nav-link"><FaTachometerAlt className="icon" /> Dashboard</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to={`${this.props.history.location.pathname.split("/").slice(0, 2).join("/")}/dataTableExample/`} className="nav-link"><FaTable className="icon" /> DataTable</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to={`${this.props.history.location.pathname.split("/").slice(0, 2).join("/")}/form/`} className="nav-link"><FaUserEdit className="icon" /> Form</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink to={`${this.props.history.location.pathname.split("/").slice(0, 2).join("/")}/crud`} className="nav-link"><FaUserEdit className="icon" /> CRUD</NavLink>
                    </Nav>
                    <Nav>
                        <NavDropdown title={ <span>Outros</span> } alignRight>
                            <NavDropdown.Item href="#action/3.1"><FaLifeRing className="icon" /> Suporte</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2"><FaTasks className="icon" /> Lista Soluções</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3"><FaBan className="icon" /> Bloqueios</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav className={ "ml-auto " }>
                        
                    </Nav>
                    <Nav  className={ 'ml-auto' }>
                        <NavDropdown title={ textMenu } alignRight className="user-menu" >
                            <NavDropdown.Item href="/" onClick={ this.logoutHandler }><FaSignOutAlt className="icon"  /> Sair </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Row className={ "secondary-navbar d-none d-md-block" }>
                <Col sm={ 11 } className="pl-1">
                    <FaStoreAlt className="icon mr-2"  style={{ fontSize: "18px" }}/>
                    <span className={"mr-4"}><strong>Código Loja:</strong> 10089</span>
                    <span className={"mr-4"}><strong>Nome:</strong>  Supermecado Leal LTDA</span>
                    <span className={"mr-4"}><strong>Responsável:</strong> João Ferreira </span>
                </Col>
            </Row>
            </>
        );
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({
        ...authActions,
        ...establishmentActions
    }, dispatch);

const mapStateToProps = state => ({
    providers: state.providers,
    auth: state.auth,
    ec: state.ec
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);