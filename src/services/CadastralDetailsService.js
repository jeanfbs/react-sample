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

export default class CadastralDetailsService {

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


    saveLegalRepresentative = async formData => {

        // const response = await HttpService.post(API_URL + LEGAL_REPRESENTATIVE, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }

    savePartner = async formData => {

        // const response = await HttpService.post(API_URL + PARTNERS, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }

    removePartner = async id => {

        // const response = await HttpService.post(API_URL + PARTNERS  + id)
        const response = await HttpService.delete('http://www.mocky.io/v2/5daf5ad13200003c46d96209/' + id)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }


    saveContact = async formData => {

        // const response = await HttpService.post(API_URL + CONTACTS, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }

    removeContact = async id => {

        // const response = await HttpService.post(API_URL + CONTACTS  + id)
        const response = await HttpService.delete('http://www.mocky.io/v2/5daf5ad13200003c46d96209/' + id)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }


    saveStoreAddress = async formData => {

        // const response = await HttpService.post(API_URL + STORE_ADDRESS, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }


    savePostAddress = async formData => {

        // const response = await HttpService.post(API_URL + POST_ADDRESS, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }

    savePeriodAddress = async formData => {

        // const response = await HttpService.post(API_URL + PERIOD_ADDRESS, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }

    getBanks = async formData => {

        // const response = await HttpService.post(API_URL + BANKS)
        const response = await HttpService.get('http://www.mocky.io/v2/5db2fe32350000c614f5534a')
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }


    saveBankAccount = async formData => {

        // const response = await HttpService.post(API_URL + BANK_ACCOUNT, formData)
        const response = await HttpService.post('http://www.mocky.io/v2/5daf5ad13200003c46d96209', formData)
        .catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        return response.data;
    }
}


