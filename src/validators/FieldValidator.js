
export default {
    
    validate: (event, formData) => {
        const { value } = event.target;
        let name = event.target.name;
        formData[ name ]['validated'] = !(value == null || value === '' || value == undefined);
        return formData;
    }
}
