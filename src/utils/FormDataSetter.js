export default {
    
    cnpjMask: (input) =>{
        return input.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    },

    phoneMask: (input) =>{
        return input.replace(/^(\d{2}) (\d{4})(\d{4})/, "($1) $2-$3");
    },

    cellphoneMask: (input) =>{
        return input.replace(/^(\d{2}) (\d{5})(\d{4})/, "($1) $2-$3");
    },

    onChangeHandler: (event, formData) => {
        
        let value = event.target.value;
        let name = event.target.name;

        if(event.target.getAttribute("type") === 'checkbox'){
            value = event.target.checked;
        }

        formData[ name ]['value'] = value;
        return formData;
    },

    onChangeHandlerComposite: (event, formData) => {
        
        let value = event.target.value;
        let name = event.target.name.split(".");

        if(event.target.getAttribute("type") === 'checkbox'){
            value = event.target.checked;
        }

        let objAux = formData[ name[0] ];
        for (let index = 1; index < name.length - 1; index++) {
            objAux =  objAux[ name[index] ];
        }
        objAux[name[name.length - 1]] = value;
        return formData;
    },

    onChangeHandleSelect: (value, name, formData) => {
        return formData[ name ] = value;
    }
}