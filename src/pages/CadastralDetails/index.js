import React, { Component } from 'react';
import {
    Container,
    Tabs,
    Tab,
    Row,
    Card,
    Col,
    OverlayTrigger,
    Popover
} from 'react-bootstrap';
import { 
    FaInfoCircle 
} from "react-icons/fa";
import Details from "./Details";
import LegalRepresentative from "./LegalRepresentative";
import Partner from "./Partner";
import Contacts from "./Contacts";
import Address from "./Address";
import BankAccount from "./BankAccount";

// chamada AJAX
// {"bContinua":false,"codigoEstabelecimento":7568,"cnpj":"58650524000108","estabelecimentoComercial":{"tipoLoja":"E","razaoSocial":"Nova Razao EC sem bloqueio","nomeFantasia":"teste de bloqueio e desbloqueio","inscricaoEstadual":"9929460188414","dataFundacao":"2016-02-06","email":"lucas@lucas.com","cnae":"4711302","contatosTelefonicos":{"telefones":[{"tipo":1,"numero":"1141255210"},{"tipo":2}]},"valorFaturamentoMesLoja":400000,"faturamentoRede":650000,"rede":false,"flagRecebimentoCentralizado":0,"statusProcessadoraCsuVisionPlus":2,"codigoNaturezaJuridica":2062,"codigoProdutoCorban":null,"codigoProdutoRecarga":null,"tipoEmpresa":"Tricard","faturamentoGrupo":650000},"enderecos":[{"codigoEndereco":12398,"codigoTipoEndereco":1,"tipoEndereco":"Sede/Residência","codigoArea":5715,"logradouro":"RUA DOUTOR FAUSTO RIBEIRO DE CARVALHO","bairro":"RUDGE RAMOS","cep":"09632030","codigoIbge":"3548708","cidade":"SAO BERNARDO DO CAMPO","estado":"SP"},{"codigoEndereco":16781,"codigoTipoEndereco":3,"tipoEndereco":"CORRESPONDENCIA","codigoArea":2259,"logradouro":"C. UPRÍ EBHÂMMG ONAÚNZD, 697","bairro":"LHTMÃQ","cep":"38170381","codigoIbge":"3149804","cidade":"PERDIZES","estado":"MG"}],"contatos":[{"codigoContato":57858,"nomeContato":"NÂBJÔLQL","contatoPrincipal":"N","infoContatos":[{"codigoComunicacao":101421,"tipoComunicacao":1,"valorComunicacao":"3436631220"},{"codigoComunicacao":101422,"tipoComunicacao":3,"valorComunicacao":"3491078371"},{"codigoComunicacao":101423,"tipoComunicacao":4,"valorComunicacao":"supsmart@netperdizes.com.br"}]},{"codigoContato":55111,"nomeContato":"PJHQAK","contatoPrincipal":"N","infoContatos":[{"codigoComunicacao":97821,"tipoComunicacao":1,"valorComunicacao":"3433541432"}]},{"codigoContato":55110,"nomeContato":"ÃHVCCÀ","contatoPrincipal":"N","infoContatos":[{"codigoComunicacao":97820,"tipoComunicacao":1,"valorComunicacao":"3433541523"}]}],"dadosContatos":[{"codigoContato":55110,"idPrincipal":"N","telefone":"3433541523","nome":"ÃHVCCÀ"},{"codigoContato":55111,"idPrincipal":"N","telefone":"3433541432","nome":"PJHQAK"},{"codigoContato":57858,"idPrincipal":"N","telefone":"3436631220","celular":"3491078371","nome":"NÂBJÔLQL","email":"supsmart@netperdizes.com.br"}],"dadosSocios":[],"dadosFuncionamento":{"dias":[],"horas":[]},"domiciliosBancarios":[],"flagPermiteEditarBoleta":false,"tipoNegociacao":{}}


export default class CadastralDetails extends Component {
    
    state = {
        data: {
            
        }
    }

    componentWillMount = () => {

        let data = {
            details: { 
                socialReason: 'Supermecado Freitas e Batista LTDA',
                cnpj:'15.807.492/0001-07',
                fantasyName:'Leal Supermecados LTDA',
                ec: 50879,
                mcc:'5411 - Hipermecados/Supermecados',
                cnae:'4711302 - MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE PRODUTOS ALIMENTÍCIOS, COM ÁREA DE VENDA ENTRE 300 E 5000 METROS QUADRADOS; COMÉRCIO VAREJISTA',
                legalNature:'Sociedade Limitada',
                joinDate:'2019-10-09',
                phone:'(27) 2978-7409',
                email:'joaobrunosilva@leal.com.br',
                whiteList:'N'
            },
            legalRepresentative: { 
                name: 'Marcela Antonia Ferreira',
                birthDate: '1992-10-07',
                paper: 'Representante Legal',
                cpf:'670.738.133-42',
                cnh:'89719779791',
                phone:'(27) 2978-7409',
                cell:'(99) 99999-9999',
                email:'joaobrunosilva@leal.com.br',
                mother: 'Mariane Souza',
                sex:'Feminino',
                address: {
                    cep:'38401146',
                    street:'Rua Coronel Antonio Alves Pereira 101',
                    district: 'Centro',
                    city: 'Uberlândia',
                    uf:'MINAS_GERAIS',
                }
            },
            address:{
                store:{ 
                    cep:'38.401-146',
                    street:'Rua Coronel Antonio Alves Pereira 101',
                    district: 'Centro',
                    city: 'Uberlândia',
                    uf:'MG',
                    phone:'(27) 2978-7409',
                    cell:'(99) 99999-9999',
                },
                post:{ 
                    cep:'38.909-123',
                    street:'Rua Matias 101',
                    district: 'Umuarama',
                    city: 'Uberlândia',
                    uf:'MG',
                    phone:'(27) 2978-7409',
                    cell:'(99) 99999-9999',
                },
                period: { 
                    days: { 
                        dom: false,
                        seg: true,
                        ter: true,
                        qua: true,
                        qui: true,
                        sex: true,
                        sab: false 
                    },
                    clocks:{
                        regular:{
                            start:'08:00',
                            end:'18:00'
                        },
                        aditional: {
                            start:'12:00',
                            end:'15:00'
                        }
                    }
                }
            }
        }

        let partners = [];
        let contacts = [];
        let accounts = [];
        for (let index = 0; index < 15; index++) {
            
            partners.push({
                name: 'Aline Carneiro dos Santos - Atualizado ' + index,
                id: '364.664.248-3' + index, 
                birthDate: '1999-05-21',
                phone: '31 32250000',
                cell: '34 991884865',
                email: 'teste@fraude.com',
                percent: 10.25
            });

            contacts.push({
                id: 165467,
                isMain: index == 0,
                name: 'Teste ' + index,
                phone: '31 32250000',
                cell: '34 991884865',
                email: 'teste@fraude.com'
            });

            accounts.push({ 
                accountType: 'Conta Pagamento',
                bank: { 
                    value: 634,
                    label: "BANCO TRIANGULO S.A."
                },
                agency: '321',
                opCode:'1',
                account:'654732-1',
                icon: index % 2 === 0 ? 'flags/master.png' : 'flags/visa.png'
            });
            
        }
        data.partners = partners;
        data.contacts = contacts;
        data.accounts = accounts;
        this.setState({ data });
    }

    render = () => {
        
        const { details, legalRepresentative, partners, contacts, address, accounts } = this.state.data;

        const overlay = <> Dados Bancários <span className="float-right"><OverlayTrigger  trigger="hover" placement="left"  overlay={Popoper}>
                            <FaInfoCircle className="help"/>
                        </OverlayTrigger></span></>
        return (
            <Container fluid>
                <br />
                <Card className="card-1">
                    <Card.Header><FaInfoCircle className="icon" /> Dados Cadastrais do Estabelecimento</Card.Header>
                    <Card.Body>
                        <Row>
                            <Col sm={ 12 } >
                                <Tabs fill  defaultActiveKey="banks" >
                                    <Tab eventKey="cadastrals" title="Dados Cadastrais">
                                        <Details details={ details }/>
                                    </Tab>
                                    <Tab eventKey="legalRepresentative" title="Representante Legal">
                                        <LegalRepresentative legalRepresentative={ legalRepresentative }/>
                                    </Tab>
                                    <Tab eventKey="partners" title="Sócios" >
                                        <Partner partners={ partners } />
                                    </Tab>
                                    <Tab eventKey="contacts" title="Contatos" >
                                        <Contacts contacts={ contacts }/>
                                    </Tab>
                                    <Tab eventKey="address" title="Endereço" >
                                        <Address address={ address }/>
                                    </Tab>
                                    <Tab eventKey="banks" title={ overlay} >
                                        <BankAccount accounts={ accounts } />
                                    </Tab>
                                </Tabs>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }
}


const Popoper = (
    <Popover id="popover-dica">
      <Popover.Content>
        <p><small>Para alterações de Dados Bancários da bandeira <b>TRICARD</b> a manutenção deve ser realizada no SGAD.</small></p>
        <p><small>Para alterações de Dados Bancários das bandeiras <b>ELO</b> e <b>ALELO</b> deve ser alterado diretamente com a CIELO.</small></p>
      </Popover.Content>
    </Popover>
  );