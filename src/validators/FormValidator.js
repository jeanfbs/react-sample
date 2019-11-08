export default {
    
    validate: (submitEvent) =>{
        
        submitEvent.preventDefault();
        const form = submitEvent.currentTarget;
        const isInvalid = !form.checkValidity();

        if (isInvalid) {
            submitEvent.stopPropagation();
        }
        return isInvalid;

    }
}
