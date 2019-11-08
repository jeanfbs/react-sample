
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;
const SERVICE_UNAVAILABLE = 503;

export default class ApiResponseResolver{

    
    resolver = (response) =>{

        if(response !== null){
            switch(response.status){
                case BAD_REQUEST:
                    return response;
                case UNAUTHORIZED:
                    return 'Credenciais Inválidas!';
                case NOT_FOUND:
                    return 'Nenhum registro foi encontrado!';
                case INTERNAL_SERVER_ERROR:
                    return 'Erro inexperado no servidor!';
                case SERVICE_UNAVAILABLE:
                    return 'Serviço indisponível!';
                default:
                    return 'Erro desconhecido!';        
            }
        }
        return 'Erro inexperado: Não foi possível recuperar a resposta do servidor!';
    }
}
