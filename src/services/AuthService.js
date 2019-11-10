import HttpService from "./HttpService";
import decode from "jwt-decode";

const { 
    REACT_APP_API_URL: API_URL, 
    REACT_APP_LOGIN: LOGIN,
    REACT_APP_RECOVERY: RECOVERY,
    REACT_APP_CLIENT_ID: CLIENT_ID
} = process.env;

export default class AuthService {

    constructor(apiResponseResolver){
        this.apiResponseResolver = apiResponseResolver;
    }

    recovery = async formData => {
        
        //return await HttpService.post(API_URL + RECOVERY, { 
            return await HttpService.post('http://www.mocky.io/v2/5dc755cb3800001300cded14',{ 
                email: formData.email
            }).catch(err => {
                throw new Error(this.apiResponseResolver.resolver(err.response));
            });
    }

    login = async formData => {
        
        // const response = await HttpService.post(API_URL + LOGIN, { 
        const authResponse = await HttpService.post('http://www.mocky.io/v2/5dc751e43800004b8bcded12',{ 
            username: formData.username, 
            password: btoa(formData.password)
        },{
            headers: {
                appId: CLIENT_ID
            }
        }).catch(err => {
            throw new Error(this.apiResponseResolver.resolver(err.response));
        });
        const { token } = authResponse.data;
        let jwtToken = null;
        if(token){
            
            jwtToken = decode(token);
            if(jwtToken.hasOwnProperty("roles") && jwtToken.hasOwnProperty("tenantyId")  && jwtToken.hasOwnProperty("username") 
                && jwtToken.hasOwnProperty("sub")){
                HttpService.initAuthInterceptor(token);
            }
        }
        return { token, username: jwtToken.username };
    }

    logout = () => {
        localStorage.clear();
    }
}


