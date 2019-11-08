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
        
        let value = event.currentTarget.value;
        let name = event.currentTarget.name;

        if(event.currentTarget.getAttribute("type") === 'checkbox'){
            value = event.currentTarget.checked;
        }

        formData[ name ] = value;
        return formData;
    },

    onChangeHandlerComposite: (event, formData) => {
        
        let value = event.currentTarget.value;
        let name = event.currentTarget.name.split(".");

        if(event.currentTarget.getAttribute("type") === 'checkbox'){
            value = event.currentTarget.checked;
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