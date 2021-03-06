import React, { Component, useState } from 'react';
import {
    Table,
    Row,
    Col,
    Pagination,
    Form,
    InputGroup,
    FormControl,
    Button,
    ButtonToolbar,
    Dropdown
} from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import {
    FaSearch,
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleRight,
    FaAngleDoubleLeft,
    FaSortDown,
    FaSortUp,
    FaSort,
    FaFilter,
    FaPlus,
    FaEye,
    FaTrashAlt,
    FaBars,
    FaEdit
} from "react-icons/fa";
import axios from "axios";
import "./style.css";


export default class DataTable extends Component {


    constructor(props){
        super(props);
        
        if(props.config == null){
            throw new Error("The prop config is required!");
        }
        if(props.config.columns == null){
            throw new Error("The prop config.columns is required!");
        }
        
        this.httpAxios = axios.create({
            timeout: 25000,
            headers: props.config.headers
        });
    }

    state = {
        sort: null,
        processing: false,
        params: { },
        response: null,
        rowsSelected: [],
        selectAll: false
    }

    httpRequestAxios = (url, params) => {

        this.setState({ processing: true, response: null });
        this.httpAxios.get(url, { params })
        .then(res =>{  
            this.setState({ response: res.data});
            this.state.response.data = this.state.response.data.slice(0,3);
            this.setState({ response: this.state.response});
        }).catch(err => {
            this.props.doOnError(err);
        }).finally( () => {
            this.setState({ processing: false });
            this.props.updated();
        });
    }

    componentWillMount = () => {
        
        const { config } = this.props;
        let sort = { index: -1, direction: null, column: null };
        let { params } = this.state;
        let filter = config.columns.filter(item => item.searchable == null || item.searchable)[0];
        
        params = {
            page: 0,
            size: 10,
            filter: filter.name
        }
        this.setState({ sort, params });
    }

    onFilterChange = event => {
        let { params } = this.state;
        params.filter = event.currentTarget.value;
        this.setState({ params });
    }

    onSearch = event => {
        event.preventDefault();
        let { params } = this.state;
        const { config } = this.props;
        params.query = event.currentTarget.value;
        this.setState({ params });
        this.httpRequestAxios(config.url, params);
    }

    searchBtnHandler = event => {
        event.preventDefault();
        const { config } = this.props;
        const { params } = this.state;
        this.httpRequestAxios(config.url, params);
    }

    onSort = index => {
        
        let { sort, params } = this.state;
        const { config } = this.props;
        sort.direction = sort.direction == null || !sort.direction;
        sort.index = index;

        params.sort = config.columns[index].name;
        params.direction = sort.direction ? 'asc' : 'desc';
        this.setState({ sort, params });
        this.httpRequestAxios(config.url, params);
    }

    onNumberEntriesChange = event => {
        event.preventDefault();
        let size = event.currentTarget.value;
        const { config } = this.props;
        let { sort, params } = this.state;

        params.size = size;
        this.setState({ sort, params });
        this.httpRequestAxios(config.url, params);
    }

    onNumberPageChange = action => {
        let { params, response } = this.state;
        const { config } = this.props;

        switch(action){
            case 'first':
                    params.page = 0;
                break;
            case 'prev':
                    params.page--;
                break;
            case 'next':
                    params.page++;
                break;
            case 'last':
                    params.page = response.totalPages - 1;
                break;
        }
        this.httpRequestAxios(config.url, params);
        this.setState({ params });
    }

    onChangeCheckSelectAll = (e) => {
        let rowsSelected = [];
        if(e.target.checked){
            rowsSelected = this.state.response.data.map(item => item[0]);
        }
        this.setState({ 
            selectAll: e.target.checked, 
            rowsSelected
        });
    }

    onChangeCheckRow = (event) => {

        let rowsSelected = this.state.rowsSelected;
        
        if(event.target.checked){
            rowsSelected.push(event.target.value);
        }else{
            rowsSelected = rowsSelected.filter(id => id !== event.target.value);
            debugger;
        }

        let selectAll = this.state.response.data.length === rowsSelected.length;
        if(!selectAll){
            selectAll = null;
        }
        this.setState({ selectAll , rowsSelected});
        
    }
    
    render = () => {

        let { sort, response, processing, params, selectAll, rowsSelected } = this.state;
        const { responsive, config, entries, placeHolder, linkToNew, linkToEdit, linkToView } = this.props;

        return (
            <div>
                <SearchDataTable 
                    columns={ config.columns } 
                    onFilterChange={ this.onFilterChange }
                    onSearch={ this.onSearch }
                    placeHolder={ placeHolder }
                    searchBtnHandler={ this.searchBtnHandler }
                />
                <DataTableTools 
                    align="top" 
                    entries={ entries }
                    page={ params.page } 
                    sizeItemsSelected={rowsSelected ? rowsSelected.length : 0}
                    totalPages={ response != null ? response.totalPages : 0 } 
                    recordsFiltered={ response != null ? response.recordsFiltered : 0 } 
                    onNumberEntriesChange={ this.onNumberEntriesChange } 
                    onNumberPageChange={ this.onNumberPageChange }
                    size={ params.size }
                    linkToNew={linkToNew}
                    linkToEdit={linkToEdit}
                    linkToView={linkToView}
                />
                <Table striped hover responsive={ responsive } size="sm">
                    <thead>
                        <tr>
                            <th className="text-center">
                                <Form.Check custom inline type={"checkbox"}
                                    className={(response == null || response.length > 0) ? 'd-none': ''}
                                    id={ "all" } 
                                    label=""
                                    checked={ selectAll != null && selectAll} 
                                    onClick={this.onChangeCheckSelectAll} 
                                    style={{verticalAlign: 'middle'}} 
                                />
                            </th>
                            { config.columns.map( (column, index ) => 
                                <th key={ index }>
                                    { column.sortable != null && !column.sortable ? column.value : 
                                        <button onClick={ event => this.onSort(index) }  className="column-sort">
                                            { column.value }  <SortIcon className="float-right mt-1" key={ index } sort={ sort } index={ index }/> 
                                        </button>
                                    }
                                </th>
                            ) }
                        </tr>
                    </thead>
                    <tbody>
                        { response != null ? response.data.map(( rowData, index ) => <RowData key={ index } columns={ config.columns } onChangeCheck={ this.onChangeCheckRow } selected={ selectAll } data={ rowData }/>): '' }
                        <tr className={ processing === false && (response == null  || response.data.length === 0) ? '' : 'd-none'}>
                            <td colSpan={ config.columns.length + 1 } className="text-center"> Nenhum resultado a ser exibido</td>
                        </tr>
                        <tr className={ processing ? '' : 'd-none'}>
                            <td colSpan={ config.columns.length + 1 } className="text-center"> 
                            <div id="lds-ring" className="m-2"><div style={ { width: '20px', height: '20px' } } className="gray"></div></div>
                                Carregando...
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <DataTableTools 
                    align="bottom" 
                    entries={ entries }
                    page={ params.page } 
                    totalPages={ response != null ? response.totalPages : 0 } 
                    recordsFiltered={ response != null ? response.recordsFiltered : 0 } 
                    onNumberEntriesChange={ this.onNumberEntriesChange } 
                    onNumberPageChange={ this.onNumberPageChange }
                    size={ params.size }/>
            </div>
        )
    }
}



const SortIcon = props => (
     props.sort.index !== props.index ? <FaSort className={ props.className } /> : 
     ( props.sort.direction ? <FaSortUp className={ props.className } /> : <FaSortDown className={ props.className } /> )
)

class RowData extends Component {
    
    state = {
        selected: false
    }

    onChangeCheck = ( event ) => {
        
        let selected = event.target.checked;
        this.setState({ selected });
        this.props.onChangeCheck( event );
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.selected != null){
            
            if(nextProps.selected){
                this.setState({ selected: true });
            }else if(!nextProps.selected){
                this.setState({ selected: false });
            }
        }
        
    }
    
    render = () => (
        <tr className={ this.state.selected ? "bg-light text-muted": "" }>
        <td className="text-center">
            <Form.Check custom inline 
            name="item" 
            value={this.props.data[ this.props.columns[0].name ]}
            type={"checkbox"} 
            id={ this.props.data[ this.props.columns[0].name ] } 
            checked={ this.state.selected } 
            label="" 
            onChange={ this.onChangeCheck } 
            style={ {verticalAlign: 'middle'} }/>
        </td>
        { this.props.columns.map((column, index) => <td key={index} className={ column.className }> { typeof column.render !== 'function' ? this.props.data[column.name] : column.render(column.name, this.props.data) } </td>) }
    </tr>
    )
}


const SearchDataTable = props => (
    <Row className="m-0">
        <Col sm={ 4 }>
            <Form.Group as={ Row } className="m-0 text-right">
                <Form.Label column sm={4}><FaFilter /> Filtros</Form.Label>
                <Col sm={ 8 }>
                    <Form.Control  as="select" onChange={ props.onFilterChange }>
                        {props.columns.map( (column, index)  =>  column.searchable == null || column.searchable ? <option key={ index } value={ column.name }> { column.value } </option> : '')}
                    </Form.Control>
                </Col>
            </Form.Group>
        </Col>
        <Col sm={ 8 }>
            <Form>
                <Form.Group>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder={ props.placeHolder == null ? "Buscar por..." : props.placeHolder }
                            onKeyUp={ props.onSearch }
                        />
                        <InputGroup.Append>
                            <Button variant="outline-primary" onClick={ props.searchBtnHandler }><FaSearch className="icon" /> Pesquisar</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            </Form>
        </Col>
    </Row>
)

const DataTableTools = props => {

    let { entries } = props;
    if(entries == null){
        entries = [5, 10, 25, 50, -1]
    }

    return (
        <Row className={props.align === "top" ? "mb-0" : "mt-0"}>
            <Col sm={1} className="p-0">
                <Dropdown className={props.align === "top" ? '': 'd-none'}>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                        <FaBars /> Ações
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item disabled={props.sizeItemsSelected > 0} href={props.linkToNew}><FaPlus /> Novo</Dropdown.Item>
                        <Dropdown.Item disabled={props.sizeItemsSelected != 1} href={props.linkToEdit}><FaEdit/> Editar</Dropdown.Item>
                        <Dropdown.Item disabled={props.sizeItemsSelected != 1} href={props.linkToView}><FaEye /> Visualiar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled={props.sizeItemsSelected == 0} href="#/action-3"><FaTrashAlt /> Excluir</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col sm={2} className="p-0" >
                <div className={props.align === "top" ? '': 'd-none'}>
                    <select className="entries" onChange={props.onNumberEntriesChange} value={props.size} >
                        {entries.map((num, index) => (
                            <option key={index} value={num}>
                                {num == -1 ? "Todos" : num}
                            </option>
                        ))}
                    </select>
                    <span>Itens</span>
                </div>
            </Col>
            <Col sm={2} className="p-0 offset-1">
                {props.recordsFiltered == 0 ? 0 : ((props.page * props.size) + 1)} / {props.recordsFiltered < (props.page + 1) * props.size ? props.recordsFiltered : (props.page + 1) * props.size} de {props.recordsFiltered} resultados
        </Col>
            <Col sm={2} className="p-0 offset-2">
                Página {props.recordsFiltered == 0 ? 0 : (props.page + 1)} / {props.totalPages}
            </Col>
            <Col sm={2} className="p-0">
                <Pagination size="sm" className="float-right">
                    <Pagination.First onClick={event => props.onNumberPageChange("first")} disabled={props.page == 0} > <FaAngleDoubleLeft /></Pagination.First>
                    <Pagination.Prev onClick={event => props.onNumberPageChange("prev")} disabled={props.page == 0}> <FaAngleLeft /> </Pagination.Prev>
                    <Pagination.Next onClick={event => props.onNumberPageChange("next")} disabled={props.page == props.totalPages - 1}> <FaAngleRight /> </Pagination.Next>
                    <Pagination.Last onClick={event => props.onNumberPageChange("last")} disabled={ props.page == props.totalPages - 1}> <FaAngleDoubleRight /> </Pagination.Last>
                </Pagination>
            </Col>
        </Row>
    );
}