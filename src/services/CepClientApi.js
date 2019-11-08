import axios from "axios";

export default class CepClientApi {
    

    findAddressByCep = async event => {

        let inputValue = event.target.value;
        if(inputValue === ''){
            return Promise.reject("Cep nulo!");
        }

        let response = await axios.get(process.env.REACT_APP_CORREIOS + inputValue.replace(/[^0-9]+/g,'') + '/json/');
        let data = response.data;
        let address = {
            cep: inputValue,
            street: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            country: 'Brasil'
        };
        return address;
    }
}
