import React, { Component } from 'react'
import {
    Card,
    Button,
    Col,
    Row,
    Form,
    Modal,
    Alert,
    ButtonToolbar,
    ToggleButton,
    ToggleButtonGroup,
    InputGroup
} from 'react-bootstrap';
import NumberFormat from 'react-number-format';
import { SelectState, ButtonState, CepInput } from "../../components";
import { FaClipboardList, FaPhone, FaCaretRight } from "react-icons/fa";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { authActions }  from "../../store/ducks/auth";
import { alertActions }  from "../../store/ducks/alert";
import FormValidator from "../../validators/FormValidator";
import Utils from "../../utils/Utils";


class Register extends Component {

    constructor(props){
        super(props);
        this.authService = props.providers.authService;
    }

    state = {
        
        type: true,
        validated: false,
        processing: false,
        formData: {
            address: { }
        }
    }



    onBlur = address => {

        const { formData } = this.state;
        address.uf = formData.uf;
        formData.address = { ...address };
        this.setState({ formData });
    }

    submitHandler = async submitEvent => {
        
        let isInvalid = FormValidator.validate(submitEvent);
        this.setState({ validated: isInvalid, processing: !isInvalid });
        if(isInvalid){
            return false;
        }
        
        const { formData } = this.state;
        
        try{
            const response = await this.authService.register(formData);
            this.props.alertSuccess("Solicitação enviada com sucesso! Um email foi encaminhado com o link de ativação da conta.");
            window.scrollTo(0, 0);
        }catch(err){
            this.props.alertError(err.message);
        }finally{
            this.setState({ processing: false });
        }
    }

    
    render = () => {

        const { 
            type,
            validated, 
            formData, 
            processing 
        } = this.state;
        const { message, variant, isShowing } = this.props.alert;

        return (
            <div>
                <Row>
                <Col sm={6} className='offset-sm-3'>
                    <Card key={"register-form"} id="register" border="dark" className="card-1">
                        <Card.Body>
                            <Row>
                                <Col sm={12} className="text-center" >
                                    <h1>Criar uma Conta</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={ 12 } >
                                    <Alert key={ "error-alert" } className="p-3" show={ isShowing } onClose={ () => this.props.alertClean() } dismissible variant={ variant || '' }>
                                        { message }
                                    </Alert>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Form   key={'registerForm'}
                                            validated={validated}
                                            onSubmit={this.submitHandler}
                                            noValidate
                                        >
                                        <fieldset>
                                            <legend>Dados Pessoais</legend>
                                            <Form.Group as={ Row } controlId="formName">
                                                <Form.Label column sm="3" className="text-right">Tipo</Form.Label>
                                                <Col sm="4">
                                                    <ButtonToolbar>
                                                        <ToggleButtonGroup type="radio" name="type" onChange={ input => this.setState({ type: input }) } value={ type } defaultValue={ true }>
                                                            <ToggleButton value={ true }>Física</ToggleButton>
                                                            <ToggleButton value={ false }>Jurídica</ToggleButton>
                                                        </ToggleButtonGroup>
                                                    </ButtonToolbar>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } controlId="formId">
                                                <Form.Label column sm="3" className="text-right">* { type ? 'CPF' : 'CNPJ'}</Form.Label>
                                                <Col sm="6">
                                                    <NumberFormat customInput={ Form.Control } format={ type ? "###.###.###-##" : "##.###.###/####-##"} mask="_" required={ !type } name="id" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.id || '' }/>
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } className={ !type ? '': 'd-none' }>
                                                <Form.Label column sm="3" name="id" className="text-right">* Razão Social </Form.Label>
                                                <Col sm="6">
                                                    <Form.Control type="text" required={ !type } name="socialReason" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.socialReason || '' }/>
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } className={ !type ? '': 'd-none' }>
                                                <Form.Label column sm="3" className="text-right">* Nome Fantasia </Form.Label>
                                                <Col sm="6">
                                                    <Form.Control type="text" required={ !type } name="fantasyName" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.fantasyName || ''} />
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } className={ !type ? '': 'd-none' }>
                                                <Form.Label column sm="3" className="text-right"> Inscrição Municipal</Form.Label>
                                                <Col sm="6">
                                                    <Form.Control type="text" name="inscMunicipal" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.inscMunicipal || ''} />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } className={ !type ? '': 'd-none' }>
                                                    <Form.Label column sm="3" className="text-right"> Inscrição Estadual </Form.Label>
                                                    <Col sm="6">
                                                        <Form.Control type="text" name="inscEstadual" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.inscEstadual || ''} />
                                                    </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row }>
                                                <Form.Label column sm="3" className="text-right">* E-Mail</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="email" required name="email" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.email || ''} />
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            
                                            <Form.Group as={ Row }>
                                                <Form.Label column sm="3" className="text-right"> Telefone </Form.Label>
                                                <Col sm="6">
                                                    <InputGroup className="mb-3">
                                                        <InputGroup.Prepend>
                                                        <InputGroup.Text > <FaPhone /> </InputGroup.Text>
                                                        </InputGroup.Prepend>
                                                        <NumberFormat customInput={ Form.Control } type="tel" format="(##) ####-####" mask="_" name="phone" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.phone || '' }/>
                                                    </InputGroup>
                                                </Col>
                                            </Form.Group>
                                            
                                            <Form.Group as={ Row }>
                                                <Form.Label column sm="3" className="text-right"> Site</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control type="text" name="site" placeholder="http://example.com.br" onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } value={ formData.site || ''} />
                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                        <fieldset>
                                            <legend className="text-primary"> <FaCaretRight />Endereço</legend>
                                            <CepInput 
                                                    customInput={ Form.Control } 
                                                    sm={ 6 } 
                                                    format="##.###-###" 
                                                    type='horizontal'
                                                    mask="_" 
                                                    name="address.cep"
                                                    required
                                                    onBlur={ this.onBlur }
                                                    onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } 
                                                    value={ formData.address.cep || '' }
                                                />
                                            <Form.Group as={ Row } controlId="formStreet">
                                                <Form.Label column sm="3" className="text-right">* Rua</Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text"  required name="address.street" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.street || '' }/>
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } controlId="formDistrict">
                                                <Form.Label column sm="3" className="text-right">* Bairro</Form.Label>
                                                <Col sm={6}>
                                                    <Form.Control type="text"  required name="address.district" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.district || '' }/>
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row } controlId="formCity">
                                                <Form.Label column sm="3" className="text-right">* Cidade</Form.Label>
                                                <Col sm={6}>
                                                    <Form.Control type="text"  required name="address.city" onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={ formData.address.city || '' }/>
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={ Row }  controlId="formUf">
                                                <Form.Label column sm="3" className="text-right">* UF</Form.Label>
                                                <Col sm={6}>
                                                    <SelectState required name="address.uf"  onChange={ event => this.setState({ formData: Utils.onChangeHandlerComposite(event, formData) }) } value={formData.address.uf || ''} />
                                                    <Form.Control.Feedback type="invalid">Campo obrigatório</Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>
                                            <hr/>
                                            <Form.Group  as={ Row }>
                                                <Col sm="12">
                                                    <Form.Check custom inline className="float-left" name="terms" label="Li e aceito os termos de uso"  type={"checkbox"} id={"check-terms"} onChange={ event => this.setState({ formData: Utils.onChangeHandler(event, formData) }) } checked={ formData.terms || false}/>
                                                    <a href="#terms" className="float-right" onClick={ () => { this.setState({ show: true }) } }><FaClipboardList /> Termo de Uso</a>
                                                </Col>
                                            </Form.Group>
                                        </fieldset>
                                        <br/>
                                        <Form.Group controlId="button" className="float-none">
                                            <ButtonState block variant="outline-primary" spinner="dark" type="submit" loading={ processing } label="Registrar" />
                                        </Form.Group>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
                <Modal
                    show={ this.state.show }
                    size="lg"
                    onHide={ () => { this.setState({ show: false }) } }
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton className="text-center">
                        <Modal.Title>
                            <h2 >Termos de Uso</h2>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <section>
                            <h4>What is Lorem Ipsum?</h4>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            It has survived not only five centuries, but also the leap into electronic typesetting, 
                            remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset 
                            sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like 
                            Aldus PageMaker including versions of Lorem Ipsum.
                            </p>
                        </section>
                        <section>
                            <h4>Why do we use it?</h4>
                            <p>
                            
                            It is a long established fact that a reader will be distracted by the readable content of a 
                            page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal 
                            distribution of letters, as opposed to using 'Content here, content here', making it look like 
                            readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their 
                            default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
                            Various versions have evolved over the years, sometimes by accident, sometimes on purpose 
                            (injected humour and the like).
                            </p>
                        </section>
                        <section>
                            <h4>Where does it come from?</h4>
                            <p>
                                Contrary to popular belief, Lorem Ipsum is not simply random text. 
                                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
                                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the 
                                more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites 
                                of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from 
                                sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
                                by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.
                                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
                                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their 
                                exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </p>
                        </section>
                        <section>
                            <h4>Where can I get some?</h4>
                            <p>
                                There are many variations of passages of Lorem Ipsum available, but the majority have 
                                suffered alteration in some form, by injected humour, or randomised words which don't look even 
                                slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't 
                                anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend 
                                to repeat predefined chunks as necessary, making this the first true generator on the Internet. 
                                It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, 
                                to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, 
                                injected humour, or non-characteristic words etc.
                            </p>
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { this.setState({ show: false })}}>Close</Button>
                    </Modal.Footer>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);