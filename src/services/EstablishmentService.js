import HttpService from "./HttpService";


const { 
    REACT_APP_API_URL: API_URL, 
    REACT_APP_ESTABLISHMENTS: ESTABLISHMENTS
} = process.env;

export default class EstablishmentService {
    
    constructor(apiResponseResolver){
        this.apiResponseResolver = apiResponseResolver;
    }

    findById = async value => {

        // let response =  await HttpService.get(API_URL + ESTABLISHMENTS + value, { 
            let response = await HttpService.get('http://www.mocky.io/v2/5daa532e3100002d00becd0b' + value)
            .catch(err => {
                throw new Error(this.apiResponseResolver.resolver(err.response));
            });
    
            return response.data;
    }

    loadEstablishment = (establishment, historic, setHistoric, setCurrentEc) => {
        const filter = historic.filter( item => item.ec == establishment.ec);
        
        if(filter === null || filter.length === 0){
            historic.push(establishment);
        }
        setHistoric(historic);
        setCurrentEc(establishment);
    }

}
