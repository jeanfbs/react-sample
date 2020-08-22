import HttpService from "./HttpService";

const { 
    REACT_APP_DETAILS: DETAILS,
    REACT_APP_LEGAL_REPRESENTATIVE: LEGAL_REPRESENTATIVE,
    REACT_APP_PARTNERS: PARTNERS,
    REACT_APP_CONTACTS: CONTACTS,
    REACT_APP_STORE_ADDRESS: STORE_ADDRESS,
    REACT_APP_POST_ADDRESS: POST_ADDRESS,
    REACT_APP_PERIOD_ADDRESS: PERIOD_ADDRESS,
    REACT_APP_BANK_ACCOUNT: BANK_ACCOUNT,
} = process.env;

export default class CrudService {

    constructor(apiResponseResolver){
        this.apiResponseResolver = apiResponseResolver;
    }

    saveDetails = async formData => {
        
        // const response = await HttpService.post(API_URL + DETAILS, formData,
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }


}


