import React, { Component } from 'react'
import {  Form } from 'react-bootstrap';

export default class SelectState extends Component {



    render = () => {

        const { name, disabled, value, onChange } = this.props;

        return (
            <Form.Control as="select" name={ name || '' } plaintext={ disabled } disabled={ disabled } value={ value } onChange={ onChange } >
                <option hidden disabled  defaultValue label="Selecione um Estado"></option>
                <option value="ACRE"> Acre </option>
                <option value="ALAGOAS"> Alagoas </option>
                <option value="AMAPA"> Amapá </option>
                <option value="AMAZONAS"> Amazonas </option>
                <option value="BAHIA"> Bahia  </option>
                <option value="CEARA"> Ceará </option>
                <option value="DISTRITO_FEDERAL"> Distrito Federal </option>
                <option value="ESPIRITO_SANTO"> Espírito Santo </option>
                <option value="GOIAS"> Goiás </option>
                <option value="MARANHAO"> Maranhão </option>
                <option value="MATO_GROSSO"> Mato Grosso </option>
                <option value="MATO_GROSSO_DO_SUL"> Mato Grosso do Sul </option>
                <option value="MINAS_GERAIS"> Minas Gerais </option>
                <option value="PARA"> Pará </option>
                <option value="PARAIBA"> Paraíba </option>
                <option value="PARANA"> Paraná </option>
                <option value="PERNAMBUCO"> Pernambuco </option>
                <option value="PIAUI"> Piauí </option>
                <option value="RIO_DE_JANEIRO"> Rio de Janeiro</option>
                <option value="RIO_GRANDE_DO_NORTE"> Rio Grande do Norte</option>
                <option value="RIO_GRANDE_DO_SUL"> Rio Grande do Sul</option>
                <option value="RONDONIA"> Rondônia </option>
                <option value="RORAIMA"> Roraima </option>
                <option value="SANTA_CATARINA"> Santa Catarina </option>
                <option value="SAO_PAULO"> São Paulo </option>
                <option value="SERGIPE"> Sergipe </option>
                <option value="TOCANTINS"> Tocantins </option>

            </Form.Control>
        )
    }
}
