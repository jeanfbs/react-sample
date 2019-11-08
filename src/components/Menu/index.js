import React, { Component } from 'react';
import { 
    Navbar, 
    Nav, 
    NavDropdown,
    Row,
    Col,
    ButtonToolbar,
    Dropdown,
    Button,
    ButtonGroup
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { 
    FaUserCircle, 
    FaSignOutAlt, 
    FaStoreAlt, 
    FaLifeRing, 
    FaTools, 
    FaHandHoldingUsd,
    FaFileInvoiceDollar,
    FaReply,
    FaTasks,
    FaBan,
    FaDesktop
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
        this.establishmentService = props.providers.establishmentService;
    }

    goToEc = establishment => {
        const { historic } = this.props.ec;
        this.establishmentService.loadEstablishment(establishment, historic, this.props.setHistoric, this.props.setCurrentEc);
    }

    logoutHandler = () => {
        this.authService.logout();
    }

    render = () => {

        const currentUser  = this.props.auth.user;
        const currentEc  = this.props.ec.current;
        const textMenu = <span className="text-uppercase"><FaUserCircle  className="icon" /> { currentUser !== null ? currentUser.name : '' } </span> ;
        
        return (
            <div>
                <Navbar className="navbar-theme" variant="light" bg="white">
                <Navbar.Brand href="#" onClick={ ev => ev.preventDefault() }>
                    <img src={ PUBLIC_URL + '/img/logo.png' } alt="Unica" width="100" />
                </Navbar.Brand>
                <Nav className={ currentEc == null ? 'd-none': '' }>
                    {console.log(this.props)}
                    <NavLink to={`${this.props.history.location.pathname.split("/").slice(0, 4).join("/")}/cadastral-details`} className="nav-link"><FaStoreAlt className="icon" /> Dados Cadastrais</NavLink>
                </Nav>
                <Nav className={ currentEc == null ? 'd-none': '' }>
                    <NavDropdown title={ <span><FaTools className="icon" /> Ferramentas</span> } >
                        <NavDropdown.Item href="#action/3.1"> <FaFileInvoiceDollar className="icon" /> Ajuste Financeiro</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"><FaTasks className="icon" /> Lista Soluções</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"><FaBan className="icon" /> Bloqueios</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4"> <FaReply className="icon" /> Estorno de Vendas</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className={ currentEc == null ? 'd-none': '' }>
                    <NavLink to={`${this.props.path}/clients/`} className="nav-link"><FaHandHoldingUsd className="icon" /> Antecipação de Recebiveis</NavLink>
                </Nav>
                <Nav className={ currentEc == null ? 'd-none': '' }>
                    <NavDropdown title={ <span>Outros</span> } alignRight>
                        <NavDropdown.Item href="#action/3.1"><FaLifeRing className="icon" /> Suporte</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2"><FaTasks className="icon" /> Lista Soluções</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"><FaBan className="icon" /> Bloqueios</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className={ "ml-auto " + (currentEc == null ? 'd-none': '') }>
                    <Button variant="secondary" size={"xs"} className="btn-tool mr-2 card-1" href={ PORTAL_WEB } target="_blank" ><FaDesktop className="icon" /> Acesso ao Portal</Button>
                    <Dropdown as={ ButtonGroup } className="btn-tool card-1" alignRight>
                        <Button href="/main/establishments/" variant="primary" size={"xs"}><FaSignOutAlt className="icon" /> Trocar EC</Button>
                        <Dropdown.Toggle split variant="primary" size={"xs"} />
                        <Dropdown.Menu className="troca-dropdown-menu"  >
                            <SwapEcDropDown goToEc={ this.goToEc }/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                <Nav  className={ currentEc == null ? 'ml-auto': 'm-0' }>
                    <NavDropdown title={ textMenu } className="user-menu" >
                        <NavDropdown.Item href="/" onClick={ this.logoutHandler }><FaSignOutAlt className="icon"  /> Sair </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <Row className={ "secondary-navbar " + (currentEc == null ? 'd-none': '') }>
                <Col sm={ 1 } className="text-right pr-1">
                    <FaStoreAlt className="icon"  style={{ fontSize: "18px" }}/>
                </Col>
                <Col sm={ 11 } className="pl-1">
                    <span className={"mr-5"}><strong>EC:</strong> { currentEc != null ? currentEc.ec : '' }</span>
                    <span className={"mr-5"}><strong>CNPJ:</strong> { currentEc != null ? Utils.cnpjMask(currentEc.cnpj) : '' } </span>
                    <span className={"mr-5"}><strong>Razão Social:</strong> { currentEc != null ? currentEc.social_reason : '' } </span>
                </Col>
            </Row>
            </div>
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